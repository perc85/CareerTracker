from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    google_sub = db.Column(db.String(255), unique=True, nullable=True)
    stytch_user_id = db.Column(db.String(255), unique=True, nullable=True)
    email = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    profile_picture=db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    local_time=db.Column(db.String(100))

    def to_dict(self):
        return {
            "google_sub": self.google_sub,
            "stytch_user_id": self.stytch_user_id,
            "email": self.email,
            "name": self.name,
            "profile_picture": self.profile_picture,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "local_time": self.local_time
        }