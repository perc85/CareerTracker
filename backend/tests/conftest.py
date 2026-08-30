import pytest
from app import create_app, db
from app.models.user import User
from app.models.jobInfo import JobApplication
from flask_jwt_extended import create_access_token



@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
    })

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def test_user(app):
    with app.app_context():
        user = User(email="test@example.com", name="Carlos")
        db.session.add(user)
        db.session.commit()
        return user.id

@pytest.fixture
def test_job_app(app):
    with app.app_context():
        job = JobApplication(
            company="Northstar Labs",
            title="Entry-Level Software Engineer",
            location="Olathe, Kansas",
            job_type="full-time",
            status="Applied",
            salary_range="$80-000 - $90,000",
            notes="Appiled via the Northstar Labs career website",
            date_applied="2026-04-10",
        )
        db.session.add(job)
        db.session.commit()
        return job.id

@pytest.fixture
def auth_headers(app, test_user):
    with app.app_context():
        token = create_access_token(identity=str(test_user))
    return {"Authorization": f"Bearer {token}"}