from flask import Blueprint, request, jsonify
from models.pickup_report_model import db, PickupReport  # ✅ updated import
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin

pickup_report_bp = Blueprint("pickup_report_bp", __name__, url_prefix="/pickup-report")

# ---------------- Create Pickup Report ----------------
@pickup_report_bp.route("/", methods=["POST"])
@cross_origin()
@jwt_required()
def create_pickup_report():
    identity = get_jwt_identity()
    data = request.get_json()

    report = PickupReport(
        user_id=identity["id"],
        location=data.get("location"),
        notes=data.get("notes")
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({"message": "Pickup report submitted successfully"}), 201

# ---------------- Get User Reports ----------------
@pickup_report_bp.route("/me", methods=["GET"])
@cross_origin()
@jwt_required()
def get_my_reports():
    identity = get_jwt_identity()
    reports = PickupReport.query.filter_by(user_id=identity["id"]).all()
    result = [
        {
            "id": r.id,
            "location": r.location,
            "notes": r.notes
        } for r in reports
    ]
    return jsonify(result), 200

# ---------------- Get Single Report ----------------
@pickup_report_bp.route("/<int:id>", methods=["GET"])
@cross_origin()
@jwt_required()
def get_single_report(id):
    r = PickupReport.query.get_or_404(id)
    return jsonify({
        "id": r.id,
        "location": r.location,
        "notes": r.notes
    }), 200

# ---------------- Edit Report ----------------
@pickup_report_bp.route("/<int:id>", methods=["PUT"])
@cross_origin()
@jwt_required()
def edit_report(id):
    r = PickupReport.query.get_or_404(id)
    data = request.get_json()
    r.location = data.get("location", r.location)
    r.notes = data.get("notes", r.notes)
    db.session.commit()
    return jsonify({"message": "Pickup report updated successfully"}), 200

# ---------------- Delete Report ----------------
@pickup_report_bp.route("/<int:id>", methods=["DELETE"])
@cross_origin()
@jwt_required()
def delete_report(id):
    r = PickupReport.query.get_or_404(id)
    db.session.delete(r)
    db.session.commit()
    return jsonify({"message": "Pickup report deleted successfully"}), 200
