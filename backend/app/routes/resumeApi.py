from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta, timezone
from app import db
from app.models.resume import Resume
from app.models.aiUsage import AiUsage
from flask_jwt_extended import jwt_required, get_jwt_identity
from dotenv import load_dotenv
import boto3
import os
from openai import OpenAI
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
    allowed_extensions = {"pdf", "doc", "docx"}

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )

    if not file:
        return jsonify({"error": "No file uploaded"}, 400)
    if file.filename == "":
        return jsonify({"error": "No selected file"}, 400)
    if "." not in file.filename:
        return jsonify({"error": "Invalid file type"}, 400)

    extension = file.filename.rsplit(".", 1)[1].lower()

    if extension not in allowed_extensions:
        return jsonify({"error": "Only PDF, DOC, and DOCX files are allowed"}, 400)

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
        return jsonify({"error": "Failed to upload resume"}), 500


def generate_url(key):

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )
    bucket_name = os.environ.get("AWS_BUCKET_NAME")

    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket_name, "Key": key},
        ExpiresIn=3600,
    )


@resumes.route("/get-all-resumes", methods=["GET"])
@jwt_required()
def get_all_resumes():
    user_id = int(get_jwt_identity())
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
    resume_info = Resume.query.filter_by(user_id=user_id).all()
    resume_info_dict = []

    ai_usage = len(
        AiUsage.query.filter(
            AiUsage.user_id == user_id, AiUsage.created_at >= thirty_days_ago
        ).all()
    )

    for resume in resume_info:
        data = resume.to_dict()
        data["fileUrl"] = generate_url(data["new_filename"])
        resume_info_dict.append(data)
    print(ai_usage)
    response = {}
    response["resumes"] = resume_info_dict
    response["ai_usage"] = ai_usage
    return jsonify(response)


@resumes.route("/<int:resume_id>", methods=["DELETE"])
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

    if not resume:
        return jsonify({"error": "No resume found"}), 404

    try:
        s3.delete_object(Bucket=bucket_name, Key=resume.new_filename)
    except Exception as e:
        print("error deleting file", e)

    db.session.delete(resume)
    db.session.commit()

    return jsonify({"message": "success"})


@resumes.route("/<int:resume_id>", methods=["GET"])
@jwt_required()
def get_resume(resume_id):
    user_id = int(get_jwt_identity())
    resume_info = Resume.query.filter_by(user_id=user_id, id=resume_id).first()

    if not resume_info:
        return jsonify({"error": "Resume not found"}), 404

    resume_info_dict = resume_info.to_dict()
    resume_info_dict["file_url"] = generate_url(resume_info_dict["new_filename"])

    return jsonify(resume_info_dict)


@resumes.route("/review/<int:resume_id>", methods=["GET", "POST"])
@jwt_required()
def review_resume(resume_id):
    user_id = int(get_jwt_identity())
    data = request.get_json()
    received_description = data.get("text", "")
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)

    client = OpenAI(api_key=os.environ.get("OPEN_AI_SECRET_KEY"))
    resume = Resume.query.filter_by(user_id=user_id, id=resume_id).first()

    if not resume:
        return jsonify({"error": "Resume not found"}), 404

    ai_usage = AiUsage.query.filter(
        AiUsage.user_id == user_id, AiUsage.created_at >= thirty_days_ago
    ).all()
    resume_dict = resume.to_dict()
    ai_usage_list = []
    for ai in ai_usage:
        ai_usage_list.append(ai.to_dict())
    count = len(ai_usage_list)
    if count >= 5:
        return jsonify({"error": "Too many requests made this month"}), 429

    response = client.responses.create(
        model="gpt-5.4-mini",
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": f"""You are an expert resume reviewer and ATS optimization specialist.

                        Analyze the following resume and provide detailed, structured feedback.

                        Use the job description below to tailor the feedback, ATS score, missing keywords, and recommendations.

                        Job Description:
                        {received_description if received_description else "No job description was provided. Give general resume feedback instead."}

                        Your response MUST follow this exact format:

                        ATS Score (out of 100):
                        <score>

                        Summary:
                        <2-3 sentence overall evaluation>

                        Strengths:
                        - <bullet point>
                        - <bullet point>
                        - <bullet point>

                        Weaknesses:
                        - <bullet point>
                        - <bullet point>
                        - <bullet point>

                        Keyword Optimization:
                        - Missing keywords from the job description:
                        - <keyword>
                        - <keyword>
                        - Suggested keywords to include:
                        - <keyword>
                        - <keyword>

                        Job Description Match:
                        - <specific skill, requirement, or keyword the resume matches well>
                        - <specific skill, requirement, or keyword the resume partially matches>
                        - <specific skill, requirement, or keyword missing from the resume>

                        Bullet Point Improvements:
                        Rewrite 2-3 weak bullet points using strong action verbs, measurable impact, and keywords from the job description when relevant.

                        Example:
                        Before: <original>
                        After: <improved>

                        Final Recommendation:
                        <clear actionable advice on how to improve the resume to pass ATS and stand out for this specific job>

                        Be specific, concise, and actionable. Avoid generic advice.""",
                    },
                    {
                        "type": "input_file",
                        "file_url": generate_url(resume_dict["new_filename"]),
                    },
                ],
            }
        ],
    )
    new_ai = AiUsage(user_id=user_id, resume_id=resume_id)
    db.session.add(new_ai)
    db.session.commit()

    return jsonify({"feedback": response.output_text})
