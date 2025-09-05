from flask import Flask, jsonify, current_app
from flask_cors import CORS
from config import Config
from models.user_model import db
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.pickup_request_routes import pickup_request_bp
from routes.pickup_confirmation_routes import pickup_confirmation_bp
from routes.pickup_report_routes import pickup_report_bp
from routes.collector_store_routes import collector_store_bp
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from utils.email_utils import send_status_email

load_dotenv(os.path.join(os.path.abspath(os.path.dirname(__file__)), ".env"))

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)
    app.config["JWT_IDENTITY_CLAIM"] = "identity"

    CORS(
        app,
        resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    )

    if not os.path.exists(app.instance_path):
        os.makedirs(app.instance_path)

    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)

    # ---------------- JWT Error Handlers ----------------
    @app.route("/")
    def home():
        return jsonify({"message": "Waste Management System API is running 🚀"}), 200

    # ---------------- Register Blueprints ----------------
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(dashboard_bp, url_prefix="/dashboard")
    app.register_blueprint(pickup_request_bp, url_prefix="/pickup-request")
    app.register_blueprint(pickup_confirmation_bp, url_prefix="/pickup-confirmation")
    app.register_blueprint(pickup_report_bp, url_prefix="/pickup-report")
    app.register_blueprint(collector_store_bp, url_prefix="/collector-store")

    # ---------------- Automatic Email Integration ----------------
    @app.after_request
    def after_request(response):
        """
        Sends email for pickup creation or status updates
        (collector actions handled automatically by pickup creation)
        """
        try:
            if response.is_json:
                data = response.get_json(silent=True)
                if isinstance(data, dict):
                    pickup_data = data.get("pickup_request")
                    if pickup_data:
                        user_email = pickup_data.get("user_email")
                        user_name = pickup_data.get("user_name")
                        status = pickup_data.get("status")
                        if user_email and user_name and status:
                            send_status_email(user_email, user_name, status)
        except Exception as e:
            current_app.logger.error(f"Email notification failed: {e}")
        return response

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
