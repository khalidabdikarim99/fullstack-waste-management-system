from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.collector_store_model import CollectorStore, db
from models.pickup_request_model import PickupRequest

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

    # Prevent duplicate storage
    if pickup_request.collector_store_entry:
        return jsonify({"error": "Pickup already stored"}), 400

    store_entry = CollectorStore(
        pickup_request_id=pickup_request_id,
        stored_quantity=stored_quantity,
        collector_id=identity.get("id")  # automatically assign logged-in collector
    )

    db.session.add(store_entry)
    db.session.commit()

    # Return pickup ID so frontend can mark as Done
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
    if identity.get("role") != "collector":
        return jsonify({"error": "Unauthorized"}), 403

    stores = CollectorStore.query.all()
    return jsonify([store.to_dict() for store in stores]), 200

# ---------------- Update store entry (e.g., mark sent to recycler) ----------------
@collector_store_bp.route("/<int:store_id>", methods=["PATCH"])
@jwt_required()
def update_store(store_id):
    identity = get_jwt_identity()
    if identity.get("role") != "collector":
        return jsonify({"error": "Unauthorized"}), 403

    store = CollectorStore.query.get(store_id)
    if not store:
        return jsonify({"error": "Store entry not found"}), 404

    data = request.get_json()
    if "stored_quantity" in data:
        store.stored_quantity = data["stored_quantity"]
    if "sent_to_recycler" in data:
        store.sent_to_recycler = data["sent_to_recycler"]

    db.session.commit()
    return jsonify({"message": "Store entry updated successfully", "store_entry": store.to_dict()}), 200

# ---------------- Delete a store entry ----------------
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
