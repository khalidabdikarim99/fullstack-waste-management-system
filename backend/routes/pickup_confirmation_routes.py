from flask import Blueprint, request, jsonify
from models.pickup_confirmation_model import db, PickupConfirmation  # ✅ updated import
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin

pickup_confirmation_bp = Blueprint("pickup_confirmation_bp", __name__, url_prefix="/pickup-confirmation")

# ---------------- Create Pickup Confirmation ----------------
@pickup_confirmation_bp.route("/", methods=["POST"])
@cross_origin()
@jwt_required()
def create_pickup_confirmation():
    identity = get_jwt_identity()
    data = request.get_json()

    confirmation = PickupConfirmation(
        user_id=identity["id"],
        waste_type=data.get("waste_type"),
        quantity=data.get("quantity"),
        amount_paid=data.get("amount_paid"),
        location=data.get("location"),
        collector_name=data.get("collector_name"),
        collector_email=data.get("collector_email"),
        collector_phone=data.get("collector_phone"),
        date=data.get("date")
    )

    db.session.add(confirmation)
    db.session.commit()

    return jsonify({"message": "Pickup confirmed successfully"}), 201

# ---------------- Get User Confirmations ----------------
@pickup_confirmation_bp.route("/me", methods=["GET"])
@cross_origin()
@jwt_required()
def get_my_confirmations():
    identity = get_jwt_identity()
    confirmations = PickupConfirmation.query.filter_by(user_id=identity["id"]).all()
    result = [
        {
            "id": c.id,
            "waste_type": c.waste_type,
            "quantity": c.quantity,
            "amount_paid": c.amount_paid,
            "location": c.location,
            "collector_name": c.collector_name,
            "collector_email": c.collector_email,
            "collector_phone": c.collector_phone,
            "date": c.date
        } for c in confirmations
    ]
    return jsonify(result), 200

# ---------------- Get Single Confirmation ----------------
@pickup_confirmation_bp.route("/<int:id>", methods=["GET"])
@cross_origin()
@jwt_required()
def get_single_confirmation(id):
    c = PickupConfirmation.query.get_or_404(id)
    return jsonify({
        "id": c.id,
        "waste_type": c.waste_type,
        "quantity": c.quantity,
        "amount_paid": c.amount_paid,
        "location": c.location,
        "collector_name": c.collector_name,
        "collector_email": c.collector_email,
        "collector_phone": c.collector_phone,
        "date": c.date
    }), 200

# ---------------- Edit Confirmation ----------------
@pickup_confirmation_bp.route("/<int:id>", methods=["PUT"])
@cross_origin()
@jwt_required()
def edit_confirmation(id):
    c = PickupConfirmation.query.get_or_404(id)
    data = request.get_json()
    c.waste_type = data.get("waste_type", c.waste_type)
    c.quantity = data.get("quantity", c.quantity)
    c.amount_paid = data.get("amount_paid", c.amount_paid)
    c.location = data.get("location", c.location)
    c.collector_name = data.get("collector_name", c.collector_name)
    c.collector_email = data.get("collector_email", c.collector_email)
    c.collector_phone = data.get("collector_phone", c.collector_phone)
    c.date = data.get("date", c.date)
    db.session.commit()
    return jsonify({"message": "Pickup confirmation updated successfully"}), 200

# ---------------- Delete Confirmation ----------------
@pickup_confirmation_bp.route("/<int:id>", methods=["DELETE"])
@cross_origin()
@jwt_required()
def delete_confirmation(id):
    c = PickupConfirmation.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({"message": "Pickup confirmation deleted successfully"}), 200
