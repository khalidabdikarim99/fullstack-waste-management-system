from flask import Blueprint, request, jsonify
from models.user_model import db
from models.admin_store_model import AdminStore, AdminProcessedItem
from datetime import datetime

admin_store_bp = Blueprint("admin_store_bp", __name__)

# ---------------- POST: Add recycler to admin store ----------------
@admin_store_bp.route("", methods=["POST"])
def add_to_admin_store():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    admin_store = AdminStore(
        recycler_id=data.get("recycler_id"),
        fullname=data.get("fullname"),
        email=data.get("email"),
        phone=data.get("phone"),
        location=data.get("location")
    )
    db.session.add(admin_store)
    db.session.commit()

    for item_data in data.get("items", []):
        processed_date_str = item_data.get("processed_date")
        try:
            processed_date = datetime.strptime(processed_date_str, "%Y-%m-%d") if processed_date_str else datetime.utcnow()
        except ValueError:
            processed_date = datetime.utcnow()

        item = AdminProcessedItem(
            admin_store_id=admin_store.id,
            category=item_data.get("category"),
            quantity=float(item_data.get("quantity", 0)),
            price=float(item_data.get("price", 0)),
            company_name=item_data.get("company_name"),
            processed_date=processed_date,
            notes=item_data.get("notes"),
            image_url=item_data.get("image_url"),
            approved=False,
            deleted=False
        )
        db.session.add(item)

    db.session.commit()
    return jsonify({"message": "Recycler posted to admin store successfully"}), 201


# ---------------- GET: Fetch all admin store entries ----------------
@admin_store_bp.route("", methods=["GET"])
def get_admin_store():
    stores = AdminStore.query.all()
    result = []
    for s in stores:
        # Filter out deleted items
        items_list = [
            {
                "id": i.id,
                "category": i.category,
                "quantity": i.quantity,
                "price": i.price,
                "company_name": i.company_name,
                "processed_date": i.processed_date.strftime("%Y-%m-%d"),
                "notes": i.notes,
                "image_url": i.image_url,
                "approved": i.approved,
                "deleted": i.deleted
            } 
            for i in getattr(s, "items", []) if not i.deleted
        ]

        if items_list:  # Only include stores with items
            result.append({
                "id": s.id,
                "recycler_id": s.recycler_id,
                "fullname": s.fullname,
                "email": s.email,
                "phone": s.phone,
                "location": s.location,
                "created_at": s.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "items": items_list
            })
    return jsonify(result), 200


# ---------------- PUT: Approve an item ----------------
@admin_store_bp.route("/approve_item/<int:item_id>", methods=["PUT"])
def approve_item(item_id):
    item = AdminProcessedItem.query.get_or_404(item_id)
    if item.deleted:
        return jsonify({"error": "Cannot approve a deleted item"}), 400
    if item.approved:
        return jsonify({"message": "Item already approved"}), 200

    item.approved = True
    db.session.commit()
    return jsonify({"message": "Item approved successfully"}), 200


# ---------------- PUT: Delete an item ----------------
@admin_store_bp.route("/delete_item/<int:item_id>", methods=["PUT"])
def delete_item(item_id):
    item = AdminProcessedItem.query.get_or_404(item_id)
    if item.deleted:
        return jsonify({"message": "Item already deleted"}), 200

    # Permanently remove item from database
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 200
