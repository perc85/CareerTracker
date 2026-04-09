from flask import Blueprint, jsonify, request
from app import db
from app.models.jobInfo import JobApplication
from app.models.user import User
from datetime import datetime, timezone, date
from flask_jwt_extended import jwt_required, get_jwt_identity
from zoneinfo import ZoneInfo
import json

jobs = Blueprint('jobs', __name__, url_prefix='/jobs')

@jobs.route('/get-app-status', methods=['GET'])
@jwt_required()
def get_job_status():
    statuses = {'total': 0}
    user_id = int(get_jwt_identity())
    job_data = JobApplication.query.filter_by(user_id=user_id).all()
    for job in job_data:
        job_dict = job.to_dict()
        if job_dict['status'] not in statuses:
            statuses[job_dict['status']] = 1
            statuses['total'] += 1
        else:
            statuses[job_dict['status']] += 1
            statuses['total'] += 1
    return jsonify(statuses)

@jobs.route('/get-job/<int:job_id>', methods=['GET'])
@jwt_required()
def get_job_info(job_id):
    user_id = int(get_jwt_identity())
    job_data = JobApplication.query.filter_by(user_id=user_id, id=job_id).first()
    job_data_dict = job_data.to_dict()
    job_data_dict['date_applied'] = job_data.date_applied.strftime("%Y-%m-%d")

    return jsonify([job_data_dict])

@jobs.route('/get-jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    user_id = int(get_jwt_identity())
    jobs = JobApplication.query.filter_by(user_id=user_id).all()
    jobs_list = []

    for job in jobs:
        job_dict = job.to_dict()
        job_dict['date_applied'] = job.date_applied.strftime("%Y-%m-%d")
        jobs_list.append(job_dict)
    return jsonify(jobs_list)

@jobs.route('/add-job', methods=['POST'])
@jwt_required()
def add_job():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    timezone_str = db.session.query(User.local_time).filter_by(id=user_id).scalar()
    tz = ZoneInfo(timezone_str) if timezone_str else timezone.utc

    if not data.get('company') or not data.get('title'):
        return jsonify({'error': 'company and title are required'}), 400

    if data.get('date_applied'):
        try:
            date_applied = date.fromisoformat(data['date_applied'])
        except ValueError:
            return jsonify({'error': 'date_applied must be ISO format (YYYY-MM-DD)'}), 400
    else:
        date_applied = datetime.now(timezone.utc).astimezone(tz).date()
        
    job = JobApplication(
        company=data['company'],
        title=data['title'],
        location=data['location'],
        job_type=data['job_type'] or None,
        status=data['status'],
        salary_range=data['salary_range'] or 'unspecified',
        notes=data['notes'] or 'None',
        date_applied=date_applied,
        user_id=user_id
    )

    db.session.add(job)
    db.session.commit()

    return jsonify(job.to_dict()), 201

@jobs.route('/<int:job_id>', methods=['DELETE'])
@jwt_required()
def delete_job(job_id):
    user_id = int(get_jwt_identity())
    job = JobApplication.query.filter_by(user_id=user_id, id=job_id).first()
    db.session.delete(job)
    db.session.commit()
    return jsonify({'message': 'success'})