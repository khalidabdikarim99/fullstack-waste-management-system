from flask import Blueprint, request, jsonify
from .. import db
from ..models.user import User
from ..utils import generate_jwt

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    user = User(
        name=data.get("name"),
        email=email,
        role=data.get("role", "user"),
        phone_number=data.get("phone_number"),
        address=data.get("address")
    )
    user.set_password(data.get("password"))
    db.session.add(user)
    db.session.commit()

    token = generate_jwt(user)
    return jsonify({"message": "Signup successful", "token": token, "user": user.to_dict()}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get("username")).first()
    if not user or not user.check_password(data.get("password")):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_jwt(user)
    return jsonify({"message": "Login successful", "token": token, "user": user.to_dict()}), 200
