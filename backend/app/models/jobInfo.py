from app import db
from datetime import datetime

class JobApplication(db.Model):
    __tablename__ = "job_applications"

    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(120))
    job_type = db.Column(db.String(50))
    status = db.Column(db.String(50))
    salary_range = db.Column(db.String(50))
    notes = db.Column(db.Text)
    date_applied = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", backref="jobs")

    def to_dict(self):
        return {
            "id": self.id,
            "company": self.company,
            "title": self.title,
            "location": self.location,
            "job_type": self.job_type,
            "status": self.status,
            "salary_range": self.salary_range,
            "notes": self.notes,
            "date_applied": self.date_applied.isoformat() if self.date_applied else None,
            "user_id": self.user_id
        }