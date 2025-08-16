from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

dashboard_bp = Blueprint("dashboard_bp", __name__)

@dashboard_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    identity = get_jwt_identity()
    role = identity["role"]

    # Role-specific responses
    if role == "admin":
        return jsonify({"message": f"Welcome Admin {identity['id']}!"})
    elif role == "recycler":
        return jsonify({"message": f"Welcome Recycler {identity['id']}!"})
    elif role == "collector":
        return jsonify({"message": f"Welcome Collector {identity['id']}!"})
    elif role == "employer":
        return jsonify({"message": f"Welcome Employer {identity['id']}!"})
    elif role == "user":
        return jsonify({"message": f"Welcome User {identity['id']}!"})
    else:
        return jsonify({"error": "Invalid role"}), 403
