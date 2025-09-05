from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.collector_store_model import CollectorStore, db
from models.pickup_request_model import PickupRequest
from models.user_model import User
from utils.email_utils import send_status_email  # ✅ import email sender

collector_store_bp = Blueprint("collector_store_bp", __name__, url_prefix="/collector-store")

# ---------------- Add a completed pickup to collector store ----------------
@collector_store_bp.route("/", methods=["POST"])
@jwt_required()
def add_to_store():
    identity = get_jwt_identity()
    if identity.get("role") != "collector":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    pickup_request_id = data.get("pickup_request_id")
    stored_quantity = data.get("stored_quantity")

    if not pickup_request_id or not stored_quantity:
        return jsonify({"error": "pickup_request_id and stored_quantity are required"}), 400

    pickup_request = PickupRequest.query.get(pickup_request_id)
    if not pickup_request:
        return jsonify({"error": "Pickup request not found"}), 404

    if pickup_request.status != "Completed":
        return jsonify({"error": "Only completed pickups can be stored"}), 400

    if pickup_request.collector_store_entry:
        return jsonify({"error": "Pickup already stored"}), 400

    store_entry = CollectorStore(
        pickup_request_id=pickup_request_id,
        stored_quantity=stored_quantity,
        collector_id=identity.get("id")
    )

    db.session.add(store_entry)
    db.session.commit()

    return jsonify({
        "message": "Pickup stored successfully",
        "pickup_request_id": pickup_request_id,
        "store_entry": store_entry.to_dict()
    }), 201

# ---------------- Get all stored pickups ----------------
@collector_store_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_stored():
    identity = get_jwt_identity()
    if identity.get("role") not in ["collector", "recycler"]:
        return jsonify({"error": "Unauthorized"}), 403

    stores = CollectorStore.query.all()
    results = []

    for store in stores:
        collector = User.query.get(store.collector_id)
        pickup = PickupRequest.query.get(store.pickup_request_id)

        if getattr(store, "sent_to_recycler", False):
            status = "Completed"
        elif getattr(store, "accepted", False):
            status = "Accepted"
        else:
            status = "New"

        results.append({
            "id": store.id,
            "collector": {
                "id": collector.id if collector else None,
                "name": collector.name if collector else None,
                "email": collector.email if collector else None,
                "phone_number": collector.phone_number if collector else None
            },
            "pickup_request": {
                "id": pickup.id if pickup else None,
                "location": pickup.location if pickup else None,
                "image_url": pickup.image_url if pickup else None,
                "quantity": pickup.quantity if pickup else None
            },
            "stored_quantity": store.stored_quantity,
            "stored_at": store.stored_at,
            "sent_to_recycler": getattr(store, "sent_to_recycler", False),
            "accepted": getattr(store, "accepted", False)
        })

    return jsonify(results), 200

# ---------------- Update store entry ----------------
@collector_store_bp.route("/<int:store_id>", methods=["PATCH"])
@jwt_required()
def update_store(store_id):
    identity = get_jwt_identity()
    store = CollectorStore.query.get(store_id)
    if not store:
        return jsonify({"error": "Store entry not found"}), 404

    data = request.get_json()

    # Get user info for email notifications
    user_email = None
    user_name = None
    if store.pickup_request_id:
        pickup_request = PickupRequest.query.get(store.pickup_request_id)
        if pickup_request and pickup_request.user_id:
            user = User.query.get(pickup_request.user_id)
            if user:
                user_email = user.email
                user_name = user.name

    # Collector actions
    if identity.get("role") == "collector":
        if "stored_quantity" in data:
            store.stored_quantity = data["stored_quantity"]
        if "sent_to_recycler" in data:
            store.sent_to_recycler = data["sent_to_recycler"]

    # Recycler actions
    elif identity.get("role") == "recycler":
        if "accepted" in data:
            store.accepted = data["accepted"]
            db.session.commit()
            if user_email and user_name:
                send_status_email(user_email, user_name, "Accepted")
            return jsonify({"message": "Pickup request successfully accepted"}), 200

        if data.get("deleted", False):
            db.session.delete(store)
            db.session.commit()
            if user_email and user_name:
                send_status_email(user_email, user_name, "Deleted")
            return jsonify({"message": "Pickup request deleted. Sorry, we are busy with many other work. You can wait or try somewhere else."}), 200

    else:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.commit()
    return jsonify({"message": "Store entry updated successfully", "store_entry": store.to_dict()}), 200

# ---------------- Delete a store entry (collector only) ----------------
@collector_store_bp.route("/<int:store_id>", methods=["DELETE"])
@jwt_required()
def delete_store(store_id):
    identity = get_jwt_identity()
    if identity.get("role") != "collector":
        return jsonify({"error": "Unauthorized"}), 403

    store = CollectorStore.query.get(store_id)
    if not store:
        return jsonify({"error": "Store entry not found"}), 404

    db.session.delete(store)
    db.session.commit()
    return jsonify({"message": "Store entry deleted successfully"}), 200
