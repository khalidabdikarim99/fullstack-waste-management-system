from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from datetime import timedelta

admin_bp = Blueprint("admin_bp", __name__)

# Hardcoded admin credentials
ADMIN_EMAIL = "waste2wealthhub@gmail.com"
ADMIN_PASSWORD = "Waste2wealth8630"

@admin_bp.route("/login", methods=["POST"])
def admin_login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        if email != ADMIN_EMAIL or password != ADMIN_PASSWORD:
            return jsonify({"error": "Invalid admin credentials"}), 401

        # Create JWT token for admin, expires in 12 hours
        access_token = create_access_token(
            identity={"email": ADMIN_EMAIL, "role": "admin"},
            expires_delta=timedelta(hours=12)
        )

        # Return user info and token
        return jsonify({
            "user": {
                "email": ADMIN_EMAIL,
                "role": "admin",
                "name": "Waste2Wealth Admin"
            },
            "token": access_token
        }), 200

    except Exception as e:
        current_app.logger.error(f"Admin login error: {e}")
        return jsonify({"error": "Internal server error"}), 500
