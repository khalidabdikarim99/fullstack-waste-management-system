from flask import Blueprint, request, jsonify
from models.user_model import db, User
from utils.password_utils import hash_password, verify_password
from utils.email_utils import send_welcome_email
from flask_cors import cross_origin
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from datetime import timedelta

auth_bp = Blueprint("auth_bp", __name__, url_prefix="/auth")

# =====================================================
#                   AUTHENTICATION
# =====================================================

# ---------------- Signup ----------------
@auth_bp.route("/signup", methods=["POST"])
@cross_origin()
def signup():
    data = request.get_json()
    required_fields = ["name", "email", "password", "role", "phone_number"]

    if not data or not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400

    password_hashed = hash_password(data['password'])

    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=password_hashed,
        role=data['role'],  # 'User', 'Collector', 'Recycler', 'Employer'
        phone_number=data['phone_number'],
        address=data.get('address')
    )

    db.session.add(new_user)
    db.session.commit()

    send_welcome_email(new_user.email, new_user.name)

    return jsonify({"message": "User registered successfully!"}), 201


# ---------------- Login ----------------
@auth_bp.route("/login/<role>", methods=["POST"])
@cross_origin()
def login(role):
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.role.lower() != role.lower():
        return jsonify({"error": f"User is not registered as {role}"}), 403

    if not verify_password(data['password'], user.password_hash):
        return jsonify({"error": "Incorrect password"}), 401

    token = create_access_token(
        identity={"id": user.id, "role": user.role, "email": user.email},
        expires_delta=timedelta(days=1)
    )

    response = {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "phone_number": user.phone_number,
            "address": user.address
        },
        "token": token
    }

    return jsonify(response), 200


# =====================================================
#                   USER PROFILE
# =====================================================
# ---------------- Profile: GET ----------------
@auth_bp.route("/profile/me", methods=["GET"])
@cross_origin()
@jwt_required()
def get_profile():
    """
    Get logged-in user's profile information
    """
    identity = get_jwt_identity()
    if not identity or "id" not in identity:
        return jsonify({"error": "Invalid token structure"}), 422

    user = User.query.get(identity['id'])
    if not user:
        return jsonify({"error": "User not found"}), 404

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }
    return jsonify(response), 200


# ---------------- Profile: UPDATE ----------------
@auth_bp.route("/profile/update", methods=["PUT"])
@cross_origin()
@jwt_required()
def update_profile():
    """
    Update logged-in user's profile information (excluding email & role)
    """
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    # Update allowed fields only
    if "name" in data:
        user.name = data["name"]
    if "phone_number" in data:
        user.phone_number = data["phone_number"]
    if "address" in data:
        user.address = data["address"]

    db.session.commit()

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }

    return jsonify(response), 200


# ---------------- Profile: CHANGE PASSWORD ----------------
@auth_bp.route("/change-password", methods=["PUT"])
@cross_origin()
@jwt_required()
def change_password():
    """
    Change logged-in user's password
    Requires: old_password, new_password
    """
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not old_password or not new_password:
        return jsonify({"error": "Both old and new passwords are required"}), 400

    if not verify_password(old_password, user.password_hash):
        return jsonify({"error": "Old password is incorrect"}), 401

    # Hash and save new password
    user.password_hash = hash_password(new_password)
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200


# =====================================================
#                   COLLECTOR PROFILE
# =====================================================
# ---------------- Collector Profile: GET ----------------
@auth_bp.route("/collector/profile", methods=["GET"])
@cross_origin()
@jwt_required()
def get_collector_profile():
    identity = get_jwt_identity()
    if not identity or "id" not in identity:
        return jsonify({"error": "Invalid token structure"}), 422

    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "collector":
        return jsonify({"error": "Collector not found"}), 404

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }
    return jsonify(response), 200


# ---------------- Collector Profile: UPDATE ----------------
@auth_bp.route("/collector/profile/update", methods=["PUT"])
@cross_origin()
@jwt_required()
def update_collector_profile():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "collector":
        return jsonify({"error": "Collector not found"}), 404

    data = request.get_json()
    if "name" in data:
        user.name = data["name"]
    if "phone_number" in data:
        user.phone_number = data["phone_number"]
    if "address" in data:
        user.address = data["address"]

    db.session.commit()

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }

    return jsonify(response), 200


# ---------------- Collector Profile: CHANGE PASSWORD ----------------
@auth_bp.route("/collector/change-password", methods=["PUT"])
@cross_origin()
@jwt_required()
def change_collector_password():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "collector":
        return jsonify({"error": "Collector not found"}), 404

    data = request.get_json()
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not old_password or not new_password:
        return jsonify({"error": "Both old and new passwords are required"}), 400

    if not verify_password(old_password, user.password_hash):
        return jsonify({"error": "Old password is incorrect"}), 401

    user.password_hash = hash_password(new_password)
    db.session.commit()

    return jsonify({"message": "Collector password updated successfully"}), 200


# =====================================================
#                   EMPLOYER PROFILE
# =====================================================
# ---------------- Employer Profile: GET ----------------
@auth_bp.route("/employer/profile", methods=["GET"])
@cross_origin()
@jwt_required()
def get_employer_profile():
    identity = get_jwt_identity()
    if not identity or "id" not in identity:
        return jsonify({"error": "Invalid token structure"}), 422

    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "employer":
        return jsonify({"error": "Employer not found"}), 404

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }
    return jsonify(response), 200


# ---------------- Employer Profile: UPDATE ----------------
@auth_bp.route("/employer/profile/update", methods=["PUT"])
@cross_origin()
@jwt_required()
def update_employer_profile():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "employer":
        return jsonify({"error": "Employer not found"}), 404

    data = request.get_json()
    if "name" in data:
        user.name = data["name"]
    if "phone_number" in data:
        user.phone_number = data["phone_number"]
    if "address" in data:
        user.address = data["address"]

    db.session.commit()

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }

    return jsonify(response), 200


# ---------------- Employer Profile: CHANGE PASSWORD ----------------
@auth_bp.route("/employer/change-password", methods=["PUT"])
@cross_origin()
@jwt_required()
def change_employer_password():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "employer":
        return jsonify({"error": "Employer not found"}), 404

    data = request.get_json()
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not old_password or not new_password:
        return jsonify({"error": "Both old and new passwords are required"}), 400

    if not verify_password(old_password, user.password_hash):
        return jsonify({"error": "Old password is incorrect"}), 401

    user.password_hash = hash_password(new_password)
    db.session.commit()

    return jsonify({"message": "Employer password updated successfully"}), 200



# =====================================================
#                   RECYCLER PROFILE
# =====================================================
# ---------------- Recycler Profile: GET ----------------
@auth_bp.route("/recycler/profile", methods=["GET"])
@cross_origin()
@jwt_required()
def get_recycler_profile():
    identity = get_jwt_identity()
    if not identity or "id" not in identity:
        return jsonify({"error": "Invalid token structure"}), 422

    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "recycler":
        return jsonify({"error": "Recycler not found"}), 404

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }
    return jsonify(response), 200


# ---------------- Recycler Profile: UPDATE ----------------
@auth_bp.route("/recycler/profile/update", methods=["PUT"])
@cross_origin()
@jwt_required()
def update_recycler_profile():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "recycler":
        return jsonify({"error": "Recycler not found"}), 404

    data = request.get_json()
    if "name" in data:
        user.name = data["name"]
    if "phone_number" in data:
        user.phone_number = data["phone_number"]
    if "address" in data:
        user.address = data["address"]

    db.session.commit()

    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number,
        "address": user.address
    }

    return jsonify(response), 200


# ---------------- Recycler Profile: CHANGE PASSWORD ----------------
@auth_bp.route("/recycler/change-password", methods=["PUT"])
@cross_origin()
@jwt_required()
def change_recycler_password():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    if not user or user.role.lower() != "recycler":
        return jsonify({"error": "Recycler not found"}), 404

    data = request.get_json()
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not old_password or not new_password:
        return jsonify({"error": "Both old and new passwords are required"}), 400

    if not verify_password(old_password, user.password_hash):
        return jsonify({"error": "Old password is incorrect"}), 401

    user.password_hash = hash_password(new_password)
    db.session.commit()

    return jsonify({"message": "Recycler password updated successfully"}), 200

