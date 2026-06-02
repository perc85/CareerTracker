from app import db
from datetime import datetime

class AiUsage(db.Model):
    __tablename__ = 'ai_usage'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    resume_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "resume_id": self.resume_id,
            "created_at": self.created_at
        }