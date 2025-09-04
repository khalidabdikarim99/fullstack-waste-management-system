from flask import Blueprint, jsonify
from flask_cors import cross_origin

dashboard_bp = Blueprint("dashboard_bp", __name__, url_prefix="/dashboard")

# Example protected route
@dashboard_bp.route("/<role>", methods=["GET"])
@cross_origin()  # Enable CORS for frontend requests
def dashboard(role):
    # Normally, check JWT or session here
    return jsonify({"message": f"Welcome to the {role} dashboard!"})
