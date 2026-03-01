from flask import Blueprint, jsonify, request
from app import db
from app.models.jobInfo import JobApplication
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

jobs = Blueprint('jobs', __name__, url_prefix='/jobs')

applications = {
    "Accepted": 10,
    "Rejected": 5,
    "Pending": 20,
    "Total": 35
}

@jobs.route('/get-app-status', methods=['GET'])
@jwt_required()
def get_job_status():
    return json.dumps(applications)

@jobs.route('/get-job/<int:job_id>', methods=['GET'])
@jwt_required()
def get_job_info(job_id):
    user_id = int(get_jwt_identity())
    job_data = JobApplication.query.filter_by(user_id=user_id, id=job_id).first()
    return jsonify([job_data.to_dict()])

@jobs.route('/get-jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    user_id = int(get_jwt_identity())
    jobs = JobApplication.query.filter_by(user_id=user_id).all()
    jobs_list = []

    for job in jobs:
        jobs_list.append(job.to_dict())
    return jsonify(jobs_list)

@jobs.route('/add-job', methods=['POST'])
@jwt_required()
def add_job():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    if not data.get('company') or not data.get('title'):
        return jsonify({'error': 'company and title are required'}), 400
    
    date_applied = None

    if data.get('date_applied'):
        try:
            date_applied = datetime.fromisoformat(data['date_applied'])
        except ValueError:
            return jsonify({'error': 'date_applied must be ISO format (YYYY-MM-DD)'}), 400
        
    job = JobApplication(
        company=data['company'],
        title=data['title'],
        location=data['location'],
        job_type=data['job_type'] or None,
        status=data['status'],
        salary_range=data['salary_range'] or 'unspecified',
        notes=data['notes'] or 'None',
        date_applied=date_applied or datetime.utcnow(),
        user_id=user_id
    )

    db.session.add(job)
    db.session.commit()

    return jsonify(job.to_dict()), 201