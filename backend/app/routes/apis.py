from flask import Blueprint, jsonify, request
from app import db
from app.models.jobInfo import JobApplication
from datetime import datetime
import json

jobs = Blueprint('jobs', __name__, url_prefix='/jobs')

applications = {
    "Accepted": 10,
    "Rejected": 5,
    "Pending": 20,
    "Total": 35
}

@jobs.route('/get-app-status', methods=['GET'])
def get_job_status():
    return json.dumps(applications)

@jobs.route('/get-job/<int:job_id>', methods=['GET'])
def get_job_info(job_id):
    job_data = JobApplication.query.get(job_id)
    return jsonify([job_data.to_dict()])

@jobs.route('/get-jobs', methods=['GET'])
def get_jobs():
    jobs = JobApplication.query.all()
    jobs_list = []

    for job in jobs:
        jobs_list.append(job.to_dict())
    return jsonify(jobs_list)

@jobs.route('/add-job', methods=['POST'])
def add_job():
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
        date_applied=date_applied or datetime.utcnow()
    )

    db.session.add(job)
    db.session.commit()

    return jsonify(job.to_dict()), 201