from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
import os

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
mail = Mail()   # ✅ add Mail instance

def create_app():
    app = Flask(__name__)
    
    # --- Database & JWT config ---
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///w2w.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key_here'
    
    # --- Mail config (Gmail) ---
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME", "waste2wealthhub@gmail.com")
    app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")  # Gmail App Password
    app.config["MAIL_DEFAULT_SENDER"] = (
        "Waste2Wealth",
        os.getenv("MAIL_USERNAME", "waste2wealthhub@gmail.com"),
    )
    
    # Init extensions
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)   # ✅ initialize mail
    
    # Import routes
    from .routes.auth import auth_bp
    from .routes.dashboard import dashboard_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(dashboard_bp, url_prefix="/dashboard")
    
    return app
