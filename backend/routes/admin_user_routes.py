from flask import Blueprint, jsonify
from models.user_model import db, User
from flask_cors import cross_origin

admin_user_bp = Blueprint("admin_user_bp", __name__, url_prefix="/admin/users")

# ---------------- Get all users ----------------
@admin_user_bp.route("/", methods=["GET"])
@cross_origin()
def get_all_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "phone_number": u.phone_number,
            "address": u.address,
            "status": u.status
        } for u in users
    ]), 200

# ---------------- Approve a user ----------------
@admin_user_bp.route("/approve/<int:user_id>", methods=["PUT"], strict_slashes=False)
@cross_origin()
def approve_user(user_id):
    user = User.query.get_or_404(user_id)
    if user.status == "accepted":
        return jsonify({"message": "User is already accepted"}), 200

    user.status = "accepted"
    db.session.commit()
    return jsonify({"message": f"User {user.name} approved successfully"}), 200

# ---------------- "Delete" a user (soft delete via status) ----------------
@admin_user_bp.route("/delete/<int:user_id>", methods=["PUT"], strict_slashes=False)
@cross_origin()
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    if user.status == "deleted":
        return jsonify({"message": "User is already deleted"}), 200

    user.status = "deleted"
    db.session.commit()
    return jsonify({"message": f"User {user.name} deleted successfully"}), 200
