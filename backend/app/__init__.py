from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

migrate = Migrate()
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    CORS(app, origins=["http://localhost:3000"])

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)

    from app.models import jobInfo
    from app.routes.apis import jobs
    app.register_blueprint(jobs)

    @app.route("/")
    def hello_world():
        return "<p>Hello, World!</p>"

    return app