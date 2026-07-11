from flask import Blueprint, jsonify
from app import db
from app.models.user import User
from app.models.jobInfo import JobApplication
from flask_jwt_extended import jwt_required, get_jwt_identity

profile = Blueprint('profile', __name__, url_prefix='/profile')

@profile.route('/get-profile-info', methods=['GET'])
@jwt_required()
def get_profile_info():
    user_id = int(get_jwt_identity())
    user_info = User.query.filter_by(id=user_id).first()
    job_info = JobApplication.query.filter_by(user_id=user_id).all()
    statuses = {}
    for job in job_info:
        status = job.to_dict()['status']
        if status in statuses:
            statuses[status] += 1
        else:
            statuses[status] = 1

    

    return jsonify({"user": user_info.to_dict(), "stats": statuses})

@profile.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    return {'success': 'verified'}
