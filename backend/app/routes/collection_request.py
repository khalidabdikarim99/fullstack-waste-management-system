from flask import Blueprint, request, jsonify
from app import db
from app.models.collection_request import CollectionRequest

collection_request_bp = Blueprint("collection_request_bp", __name__)

# --- Create ---
@collection_request_bp.route("/collection-request", methods=["POST"])
def create_request():
    data = request.get_json()
    try:
        new_request = CollectionRequest(
            waste_type=data.get("wasteType"),
            collection_date=data.get("collectionDate"),
            collection_time=data.get("collectionTime"),
            frequency=data.get("frequency"),
            address=data.get("address"),
            notes=data.get("notes"),
            quantity=data.get("quantity"),
            photo=data.get("photo"),
        )
        db.session.add(new_request)
        db.session.commit()
        return jsonify(new_request.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# --- Read ---
@collection_request_bp.route("/collection-request", methods=["GET"])
def get_requests():
    try:
        requests = CollectionRequest.query.all()
        return jsonify([r.to_dict() for r in requests]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- Update ---
@collection_request_bp.route("/collection-request/<int:id>", methods=["PUT"])
def update_request(id):
    data = request.get_json()
    try:
        req = CollectionRequest.query.get_or_404(id)
        req.waste_type = data.get("wasteType", req.waste_type)
        req.collection_date = data.get("collectionDate", req.collection_date)
        req.collection_time = data.get("collectionTime", req.collection_time)
        req.frequency = data.get("frequency", req.frequency)
        req.address = data.get("address", req.address)
        req.notes = data.get("notes", req.notes)
        req.quantity = data.get("quantity", req.quantity)
        req.photo = data.get("photo", req.photo)

        db.session.commit()
        return jsonify(req.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# --- Delete ---
@collection_request_bp.route("/collection-request/<int:id>", methods=["DELETE"])
def delete_request(id):
    try:
        req = CollectionRequest.query.get_or_404(id)
        db.session.delete(req)
        db.session.commit()
        return jsonify({"message": "Request deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
