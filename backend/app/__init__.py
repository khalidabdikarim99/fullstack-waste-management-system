# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
import os

# --- Extensions ---
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
mail = Mail()

def create_app():
    app = Flask(__name__)

    # --- Database config ---
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///waste_management.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # --- JWT config ---
    app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key_here"

    # --- Mail config (optional) ---
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME", "waste2wealthhub@gmail.com")
    app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = (
        "Waste2Wealth",
        os.getenv("MAIL_USERNAME", "waste2wealthhub@gmail.com"),
    )

    # --- Init extensions ---
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)
    CORS(app)

    # --- Register Blueprints ---
    from app.routes.collection_request import collection_request_bp
    app.register_blueprint(collection_request_bp, url_prefix="/api")

    return app
