from flask import Blueprint, request, jsonify
from models.pickup_request_model import db, PickupRequest
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin

pickup_request_bp = Blueprint("pickup_request_bp", __name__, url_prefix="/pickup-request")

# ---------------- Create Pickup Request ----------------
@pickup_request_bp.route("/", methods=["POST"])
@cross_origin()
@jwt_required()
def create_pickup_request():
    identity = get_jwt_identity()
    data = request.get_json()

    new_request = PickupRequest(
        user_id=identity["id"],
        quantity=data.get("quantity"),
        location=data.get("location"),
        image_url=data.get("image_url"),
        notes=data.get("notes")
    )

    db.session.add(new_request)
    db.session.commit()

    return jsonify({"message": "Pickup request created successfully"}), 201

# ---------------- Get User Pickup Requests ----------------
@pickup_request_bp.route("/me", methods=["GET"])
@cross_origin()
@jwt_required()
def get_my_pickups():
    identity = get_jwt_identity()
    requests = PickupRequest.query.filter_by(user_id=identity["id"]).all()
    result = [
        {
            "id": r.id,
            "quantity": r.quantity,
            "location": r.location,
            "image_url": r.image_url,
            "notes": r.notes,
        } for r in requests
    ]
    return jsonify(result), 200

# ---------------- Get Single Pickup ----------------
@pickup_request_bp.route("/<int:id>", methods=["GET"])
@cross_origin()
@jwt_required()
def get_single_pickup(id):
    pickup = PickupRequest.query.get_or_404(id)
    return jsonify({
        "id": pickup.id,
        "quantity": pickup.quantity,
        "location": pickup.location,
        "image_url": pickup.image_url,
        "notes": pickup.notes,
    }), 200

# ---------------- Edit Pickup ----------------
@pickup_request_bp.route("/<int:id>", methods=["PUT"])
@cross_origin()
@jwt_required()
def edit_pickup(id):
    pickup = PickupRequest.query.get_or_404(id)
    data = request.get_json()
    pickup.quantity = data.get("quantity", pickup.quantity)
    pickup.location = data.get("location", pickup.location)
    pickup.image_url = data.get("image_url", pickup.image_url)
    pickup.notes = data.get("notes", pickup.notes)
    db.session.commit()
    return jsonify({"message": "Pickup request updated successfully"}), 200

# ---------------- Delete Pickup ----------------
@pickup_request_bp.route("/<int:id>", methods=["DELETE"])
@cross_origin()
@jwt_required()
def delete_pickup(id):
    pickup = PickupRequest.query.get_or_404(id)
    db.session.delete(pickup)
    db.session.commit()
    return jsonify({"message": "Pickup request deleted successfully"}), 200
