from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

load_dotenv()

migrate = Migrate()
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    CORS(app, origins=[os.environ.get("FRONTEND_URL")])

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=6)
    jwt = JWTManager(app)

    db.init_app(app)
    migrate.init_app(app, db)

    from app.models import user
    from app.models import jobInfo
    from app.models import resume
    from app.models import aiUsage
    from app.routes.jobsApi import jobs
    from app.routes.profileApi import profile
    from app.routes.resumeApi import resumes
    from app.routes.googleAuth import google_oauth
    from app.routes.magicLink import magic_link
    app.register_blueprint(jobs)
    app.register_blueprint(profile)
    app.register_blueprint(resumes)
    app.register_blueprint(google_oauth, url_prefix="/api/auth")
    app.register_blueprint(magic_link, url_prefix="/api/auth")

    @app.route("/")
    def hello_world():
        return "<p>Hello, World!</p>"

    return app