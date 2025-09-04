from flask import Blueprint, request, jsonify
from models.pickup_request_model import db, PickupRequest
from models.user_model import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
from utils.email_utils import send_status_email

pickup_request_bp = Blueprint("pickup_request_bp", __name__, url_prefix="/pickup-request")

# ---------------- User: Create Pickup Request ----------------
@pickup_request_bp.route("/", methods=["POST"])
@cross_origin()
@jwt_required()
def create_pickup_request():
    identity = get_jwt_identity()
    user = User.query.get_or_404(identity["id"])
    data = request.get_json()

    new_request = PickupRequest(
        user_id=user.id,
        quantity=data.get("quantity"),
        location=data.get("location"),
        image_url=data.get("image_url"),
        notes=data.get("notes"),
        status="Pending"
    )

    db.session.add(new_request)
    db.session.commit()

    # Send Pending email notification
    send_status_email(user.email, user.name, "Pending")

    return jsonify({
        "message": "Pickup request created successfully",
        "pickup_request": {
            "id": new_request.id,
            "user_name": user.name,
            "user_email": user.email,
            "user_phone": getattr(user, "phone_number", ""),
            "quantity": new_request.quantity,
            "location": new_request.location,
            "image_url": new_request.image_url,
            "notes": new_request.notes,
            "status": new_request.status
        }
    }), 201

# ---------------- User: Get My Pickup Requests ----------------
@pickup_request_bp.route("/me", methods=["GET"])
@cross_origin()
@jwt_required()
def get_my_pickups():
    identity = get_jwt_identity()
    requests = PickupRequest.query.filter_by(user_id=identity["id"]).all()
    result = [
        {
            "id": r.id,
            "user_name": r.user.name,
            "user_email": r.user.email,
            "user_phone": getattr(r.user, "phone_number", ""),
            "quantity": r.quantity,
            "location": r.location,
            "image_url": r.image_url,
            "notes": r.notes,
            "status": r.status
        } for r in requests
    ]
    return jsonify(result), 200

# ---------------- Collector: Get All Pickup Requests ----------------
@pickup_request_bp.route("/all", methods=["GET"])
@cross_origin()
@jwt_required()
def get_all_pickups():
    identity = get_jwt_identity()
    if identity.get("role") != "collector":
        return jsonify({"error": "Unauthorized"}), 403

    requests = PickupRequest.query.all()
    result = [
        {
            "id": r.id,
            "user_name": r.user.name,
            "user_email": r.user.email,
            "user_phone": getattr(r.user, "phone_number", ""),
            "quantity": r.quantity,
            "location": r.location,
            "image_url": r.image_url,
            "notes": r.notes,
            "status": r.status
        } for r in requests
    ]
    return jsonify(result), 200

# ---------------- Get Single Pickup (User or Collector) ----------------
@pickup_request_bp.route("/<int:id>", methods=["GET"])
@cross_origin()
@jwt_required()
def get_single_pickup(id):
    pickup = PickupRequest.query.get_or_404(id)
    return jsonify({
        "id": pickup.id,
        "user_name": pickup.user.name,
        "user_email": pickup.user.email,
        "user_phone": getattr(pickup.user, "phone_number", ""),
        "quantity": pickup.quantity,
        "location": pickup.location,
        "image_url": pickup.image_url,
        "notes": pickup.notes,
        "status": pickup.status
    }), 200

# ---------------- User: Edit Pickup ----------------
@pickup_request_bp.route("/<int:id>", methods=["PUT"])
@cross_origin()
@jwt_required()
def edit_pickup(id):
    pickup = PickupRequest.query.get_or_404(id)
    identity = get_jwt_identity()
    if pickup.user_id != identity["id"]:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    pickup.quantity = data.get("quantity", pickup.quantity)
    pickup.location = data.get("location", pickup.location)
    pickup.image_url = data.get("image_url", pickup.image_url)
    pickup.notes = data.get("notes", pickup.notes)
    db.session.commit()
    return jsonify({
        "message": "Pickup request updated successfully",
        "pickup_request": {
            "id": pickup.id,
            "user_name": pickup.user.name,
            "user_email": pickup.user.email,
            "user_phone": getattr(pickup.user, "phone_number", ""),
            "quantity": pickup.quantity,
            "location": pickup.location,
            "image_url": pickup.image_url,
            "notes": pickup.notes,
            "status": pickup.status
        }
    }), 200

# ---------------- User: Delete Pickup ----------------
@pickup_request_bp.route("/<int:id>", methods=["DELETE"])
@cross_origin()
@jwt_required()
def delete_pickup(id):
    pickup = PickupRequest.query.get_or_404(id)
    identity = get_jwt_identity()
    if pickup.user_id != identity["id"]:
        return jsonify({"error": "Unauthorized"}), 403

    pickup.status = "Deleted"
    db.session.commit()

    # Send Deleted email notification
    send_status_email(pickup.user.email, pickup.user.name, "Deleted")

    return jsonify({"message": "Your pickup request has been deleted. You may submit a new request anytime."}), 200

# ---------------- Collector: Update Pickup Status ----------------
@pickup_request_bp.route("/<int:id>/status", methods=["PATCH"])
@cross_origin()
@jwt_required()
def update_pickup_status(id):
    identity = get_jwt_identity()
    if identity.get("role") != "collector":
        return jsonify({"error": "Unauthorized"}), 403

    pickup = PickupRequest.query.get_or_404(id)
    data = request.get_json()
    new_status = data.get("status", pickup.status)

    if new_status not in ["Pending", "Accepted", "Completed", "Deleted"]:
        return jsonify({"error": "Invalid status"}), 400

    pickup.status = new_status
    db.session.commit()

    # Send email notification to user
    send_status_email(pickup.user.email, pickup.user.name, new_status)

    return jsonify({
        "message": f"Pickup status updated to {pickup.status}",
        "pickup_request": {
            "id": pickup.id,
            "user_name": pickup.user.name,
            "user_email": pickup.user.email,
            "user_phone": getattr(pickup.user, "phone_number", ""),
            "quantity": pickup.quantity,
            "location": pickup.location,
            "image_url": pickup.image_url,
            "notes": pickup.notes,
            "status": pickup.status
        }
    }), 200
