from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from config import Config
from models.user_model import db
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.pickup_request_routes import pickup_request_bp
from routes.pickup_confirmation_routes import pickup_confirmation_bp
from routes.pickup_report_routes import pickup_report_bp
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate  # ✅ Import Migrate
import os
from dotenv import load_dotenv

# Import email utility
from utils.email_utils import send_status_email

# Load environment variables
load_dotenv(os.path.join(os.path.abspath(os.path.dirname(__file__)), ".env"))

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)

    # Allow dict identities in JWT
    app.config["JWT_IDENTITY_CLAIM"] = "identity"

    # Enable CORS globally
    CORS(
        app,
        resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    )

    @app.before_request
    def handle_options():
        if request.method == "OPTIONS":
            response = make_response()
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
            response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
            return response, 200

    # Ensure instance folder exists
    if not os.path.exists(app.instance_path):
        os.makedirs(app.instance_path)

    # Initialize database
    db.init_app(app)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)  # ✅ This enables migrations

    # Initialize JWT
    jwt = JWTManager(app)

    # JWT error handlers...
    @jwt.unauthorized_loader
    def handle_missing_token(err_str):
        return jsonify({"error": "Missing authorization header"}), 401

    @jwt.invalid_token_loader
    def handle_invalid_token(err_str):
        return jsonify({"error": "Invalid token"}), 422

    @jwt.expired_token_loader
    def handle_expired_token(jwt_header, jwt_payload):
        return jsonify({"error": "Token has expired"}), 401

    @jwt.revoked_token_loader
    def handle_revoked_token(jwt_header, jwt_payload):
        return jsonify({"error": "Token has been revoked"}), 401

    @jwt.needs_fresh_token_loader
    def handle_fresh_token_required(jwt_header, jwt_payload):
        return jsonify({"error": "Fresh token required"}), 401

    @jwt.user_lookup_error_loader
    def handle_user_lookup_error(jwt_header, jwt_payload):
        return jsonify({"error": "User not found for this token"}), 404

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(dashboard_bp, url_prefix="/dashboard")
    app.register_blueprint(pickup_request_bp, url_prefix="/pickup-request")
    app.register_blueprint(pickup_confirmation_bp, url_prefix="/pickup-confirmation")
    app.register_blueprint(pickup_report_bp, url_prefix="/pickup-report")

    # Root route
    @app.route("/")
    def home():
        return jsonify({"message": "Waste Management System API is running 🚀"}), 200

    # ---------------- Automatic Email Integration ----------------
    # Wrap the pickup_request_bp endpoints to send emails automatically
    from flask import current_app

    @app.after_request
    def after_request(response):
        """
        This function will run after every request.
        It checks for pickup creation or status update and sends email notifications.
        """
        try:
            # Only trigger after JSON responses
            if response.is_json:
                data = response.get_json()
                # Check if pickup_request data exists
                pickup_data = data.get("pickup_request") if isinstance(data, dict) else None
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
