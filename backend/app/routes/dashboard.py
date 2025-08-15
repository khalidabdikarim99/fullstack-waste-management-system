from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

dashboard_bp = Blueprint("dashboard_bp", __name__)

# Example: role-based dashboard endpoints
@dashboard_bp.route("/admin", methods=["GET"])
@jwt_required()
def admin_dashboard():
    identity = get_jwt_identity()
    if identity["role"] != "admin":
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({"message": f"Welcome Admin {identity['id']}!"})

@dashboard_bp.route("/recycler", methods=["GET"])
@jwt_required()
def recycler_dashboard():
    identity = get_jwt_identity()
    if identity["role"] != "recycler":
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({"message": f"Welcome Recycler {identity['id']}!"})

@dashboard_bp.route("/collector", methods=["GET"])
@jwt_required()
def collector_dashboard():
    identity = get_jwt_identity()
    if identity["role"] != "collector":
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({"message": f"Welcome Collector {identity['id']}!"})

@dashboard_bp.route("/employer", methods=["GET"])
@jwt_required()
def employer_dashboard():
    identity = get_jwt_identity()
    if identity["role"] != "employer":
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({"message": f"Welcome Employer {identity['id']}!"})

@dashboard_bp.route("/user", methods=["GET"])
@jwt_required()
def user_dashboard():
    identity = get_jwt_identity()
    return jsonify({"message": f"Welcome User {identity['id']}!"})
