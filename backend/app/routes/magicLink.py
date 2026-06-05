from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from dotenv import load_dotenv
from app.models.user import User
from app import db
from stytch import Client
import os

load_dotenv()

magic_link = Blueprint('magic_link', __name__)

project_id = os.environ.get("STYTCH_PROJECT_ID")
secret = os.environ.get("STYTCH_SECRET_ID")

client = Client(
    project_id=project_id,
    secret=secret
)

@magic_link.route('/magic-link/send', methods=['POST'])
def send_email():
    user_email = request.json.get('user_email')
    if not user_email:
        return jsonify({'error': 'Email not found'}), 404
    
    try:
        response = client.magic_links.email.login_or_create(
            email=user_email,
        )
    except Exception as e:
        print("Stytch send error:", e)
        return jsonify({"error": "Unable to send magic link"}), 500
    
    return jsonify({'message': 'success'})
    
@magic_link.route('/magic-link/auth', methods=['POST'])
def auth_email():
    token = request.json.get('token')
    local_time_zone = request.json.get('time')

    if not token:
        return jsonify({"error": "Token is required"}), 400
    
    try:
        resp = client.magic_links.authenticate(
            token = token,
            session_duration_minutes=5760
        )
    except Exception as e:
        print("Stytch error:", e)
        return jsonify({"error": "Magic link is invalid, expired, or already used"}), 401
    
    user_email = resp.user.emails[0].email
    user = User.query.filter_by(email=user_email).first()
    
    if user:
        user.stytch_user_id = resp.user_id
    else:
        user = User(
            stytch_user_id = resp.user_id,
            email=user_email,
            local_time=local_time_zone
        )
        db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.to_dict()
    })
    

