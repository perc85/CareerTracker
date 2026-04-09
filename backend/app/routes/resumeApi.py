from flask import Blueprint, jsonify, request
from app import db
from app.models.resume import Resume
from flask_jwt_extended import jwt_required, get_jwt_identity
from dotenv import load_dotenv
import boto3
import os
import uuid
from botocore.exceptions import ClientError

load_dotenv()

resumes = Blueprint("resumes", __name__, url_prefix="/resume")


@resumes.route("/add_resume", methods=["POST"])
@jwt_required()
def add_resume():
    user_id = int(get_jwt_identity())
    resume_name = request.form.get("resumeName")
    category = request.form.get("category")
    notes = request.form.get("notes")
    file = request.files.get("file")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )

    try:
        new_filename = uuid.uuid4().hex + "." + file.filename.rsplit(".", 1)[1].lower()
        response = s3.upload_fileobj(
            file.stream,
            os.environ.get("AWS_BUCKET_NAME"),
            new_filename,
            ExtraArgs={"ContentType": file.content_type},
        )
        resume = Resume(
            user_id=user_id,
            name=resume_name,
            original_filename=file.filename,
            new_filename=new_filename,
        )

        db.session.add(resume)
        db.session.commit()

        return jsonify({"success": "Resume uploaded successfully"})

    except ClientError as e:
        return jsonify({"error": "Failed to upload resume"})


def generate_url(key):

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )

    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": "careertracker-resumes", "Key": key},
        ExpiresIn=3600,
    )


@resumes.route("/get-all-resumes", methods=["GET"])
@jwt_required()
def get_all_resumes():
    user_id = int(get_jwt_identity())
    resume_info = Resume.query.filter_by(user_id=user_id).all()
    resume_info_dict = []
    for resume in resume_info:
        data = resume.to_dict()
        data["fileUrl"] = generate_url(data["new_filename"])
        resume_info_dict.append(data)
    return jsonify(resume_info_dict)


@resumes.route("/<int:resume_id>", methods=['DELETE'])
@jwt_required()
def delete_resume(resume_id):
    user_id = int(get_jwt_identity())
    resume = Resume.query.filter_by(user_id=user_id, id=resume_id).first()
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )
    bucket_name = os.environ.get("AWS_BUCKET_NAME")

    try:
        s3.delete_object(Bucket=bucket_name, Key=resume.new_filename)
    except Exception as e:
        print('error deleting file', e)

    db.session.delete(resume)
    db.session.commit()

    return jsonify({'message': 'success'})
