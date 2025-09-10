from flask import Blueprint, request, jsonify
from models.user_model import db
from models.recycler_model import Recycler, ProcessedItem
from datetime import datetime

recycler_bp = Blueprint("recycler_bp", __name__)

# ---------------- POST: Add Recycler + Items ----------------
@recycler_bp.route("", methods=["POST"])
def add_recycler():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    recycler = Recycler(
        fullname=data.get("fullname"),
        email=data.get("email"),
        phone=data.get("phone"),
        location=data.get("location")
    )
    db.session.add(recycler)
    db.session.commit()  # generate recycler.id

    for item_data in data.get("items", []):
        processed_date_str = item_data.get("processed_date")
        try:
            processed_date = datetime.strptime(processed_date_str, "%Y-%m-%d") if processed_date_str else datetime.utcnow()
        except ValueError:
            processed_date = datetime.utcnow()

        item = ProcessedItem(
            recycler_id=recycler.id,
            category=item_data.get("category"),
            quantity=float(item_data.get("quantity", 0)),
            price=float(item_data.get("price", 0)),
            company_name=item_data.get("company_name"),
            processed_date=processed_date,
            notes=item_data.get("notes"),
            image_url=item_data.get("image_url")  # <-- updated field
        )
        db.session.add(item)

    db.session.commit()
    return jsonify({"message": "Recycler data added successfully"}), 201


# ---------------- GET: Fetch All Recyclers + Items ----------------
@recycler_bp.route("", methods=["GET"])
def get_recyclers():
    recyclers = Recycler.query.all()
    result = []
    for r in recyclers:
        result.append({
            "id": r.id,
            "fullname": r.fullname,
            "email": r.email,
            "phone": r.phone,
            "location": r.location,
            "items": [
                {
                    "id": i.id,
                    "category": i.category,
                    "quantity": i.quantity,
                    "price": i.price,
                    "company_name": i.company_name,
                    "processed_date": i.processed_date.strftime("%Y-%m-%d"),
                    "notes": i.notes,
                    "image_url": i.image_url
                }
                for i in getattr(r, "items", [])
            ]
        })
    return jsonify(result), 200


# ---------------- DELETE: Remove Recycler + Items ----------------
@recycler_bp.route("/<int:recycler_id>", methods=["DELETE"])
def delete_recycler(recycler_id):
    recycler = Recycler.query.get_or_404(recycler_id)
    for item in getattr(recycler, "items", []):
        db.session.delete(item)
    db.session.delete(recycler)
    db.session.commit()
    return jsonify({"message": "Recycler deleted successfully"}), 200


# ---------------- PUT: Edit Recycler + Items ----------------
@recycler_bp.route("/<int:recycler_id>", methods=["PUT"])
def edit_recycler(recycler_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    recycler = Recycler.query.get_or_404(recycler_id)

    # Update recycler info
    recycler.fullname = data.get("fullname", recycler.fullname)
    recycler.email = data.get("email", recycler.email)
    recycler.phone = data.get("phone", recycler.phone)
    recycler.location = data.get("location", recycler.location)
    db.session.commit()

    # Remove old items if full replacement requested
    if data.get("replace_items", False):
        for item in getattr(recycler, "items", []):
            db.session.delete(item)
        db.session.commit()

    # Add/update items
    for item_data in data.get("items", []):
        processed_date_str = item_data.get("processed_date")
        try:
            processed_date = datetime.strptime(processed_date_str, "%Y-%m-%d") if processed_date_str else datetime.utcnow()
        except ValueError:
            processed_date = datetime.utcnow()

        item_id = item_data.get("id")
        if item_id:
            item = ProcessedItem.query.filter_by(id=int(item_id), recycler_id=recycler.id).first()
            if item:
                item.category = item_data.get("category", item.category)
                item.quantity = float(item_data.get("quantity", item.quantity))
                item.price = float(item_data.get("price", item.price))
                item.company_name = item_data.get("company_name", item.company_name)
                item.processed_date = processed_date
                item.notes = item_data.get("notes", item.notes)
                item.image_url = item_data.get("image_url", item.image_url)  # <-- updated
            else:
                new_item = ProcessedItem(
                    recycler_id=recycler.id,
                    category=item_data.get("category"),
                    quantity=float(item_data.get("quantity", 0)),
                    price=float(item_data.get("price", 0)),
                    company_name=item_data.get("company_name"),
                    processed_date=processed_date,
                    notes=item_data.get("notes"),
                    image_url=item_data.get("image_url")
                )
                db.session.add(new_item)
        else:
            new_item = ProcessedItem(
                recycler_id=recycler.id,
                category=item_data.get("category"),
                quantity=float(item_data.get("quantity", 0)),
                price=float(item_data.get("price", 0)),
                company_name=item_data.get("company_name"),
                processed_date=processed_date,
                notes=item_data.get("notes"),
                image_url=item_data.get("image_url")
            )
            db.session.add(new_item)

    db.session.commit()
    return jsonify({"message": "Recycler updated successfully"}), 200
