from flask import Blueprint, jsonify
from app import db
from app.models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

profile = Blueprint('profile', __name__, url_prefix='/profile')

@profile.route('/get-profile-info', methods=['GET'])
@jwt_required()
def get_profile_info():
    user_id = int(get_jwt_identity())
    user_info = User.query.filter_by(id=user_id).first()
    return jsonify(user_info.to_dict())
