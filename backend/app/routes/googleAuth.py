from flask import Blueprint, jsonify, request
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_jwt_extended import create_access_token
from dotenv import load_dotenv
from app.models.user import User
from app import db
import os

load_dotenv()

google_oauth = Blueprint('google_oauth', __name__, url_prefix='/api/auth')
GOOGLE_CLIENT_ID=os.environ.get("GOOGLE_CLIENT_ID")

@google_oauth.route('/google', methods=['POST'])
def auth_google():
    data = request.get_json()
    token = data.get('token')
    if not token:
        return jsonify({"error": "Token not found"}), 400
    
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

    except ValueError:
        return jsonify({"message": "Invalid Google Token"}), 401
    
    google_sub = idinfo.get("sub")
    email = idinfo.get("email")
    name = idinfo.get("name")
    picture = idinfo.get("picture")
    local_time = data.get("local_time")

    if not google_sub or not email:
        return jsonify({"message": "Google token missing required fields"}), 401
    
    user = User.query.filter_by(google_sub=google_sub).first()

    if not user:
        user=User(
            google_sub=google_sub,
            email=email,
            name=name,
            profile_picture=picture,
            local_time=local_time
        )
        db.session.add(user)
        db.session.commit()

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.to_dict()
    })
        


@google_oauth.route('/me', methods=['GET'])
def restore_state():
    print('waiting')

@google_oauth.route('/logout', methods=['POST'])
def handle_logout():
    print('waiting')