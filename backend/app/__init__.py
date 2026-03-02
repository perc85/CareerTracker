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

    CORS(app, origins=["http://localhost:3000"])

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=6)
    jwt = JWTManager(app)

    db.init_app(app)
    migrate.init_app(app, db)

    from app.models import user
    from app.models import jobInfo
    from app.routes.jobsApi import jobs
    from app.routes.profileApi import profile
    from app.routes.googleAuth import google_oauth
    app.register_blueprint(jobs)
    app.register_blueprint(profile)
    app.register_blueprint(google_oauth)

    @app.route("/")
    def hello_world():
        return "<p>Hello, World!</p>"

    return app