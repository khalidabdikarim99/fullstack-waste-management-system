from flask import Blueprint, request, jsonify
from .. import db
from ..models.user import User
from ..utils import generate_jwt
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

auth_bp = Blueprint("auth_bp", __name__)

# Get credentials from .env
SENDER_EMAIL = os.getenv("MAIL_USERNAME")
APP_PASSWORD = os.getenv("MAIL_PASSWORD")

if not SENDER_EMAIL or not APP_PASSWORD:
    raise ValueError("MAIL_USERNAME and MAIL_PASSWORD must be set in your .env file")


def send_welcome_email(to_email, name):
    """
    Sends a welcome email to the newly registered user.
    Handles UTF-8 characters (like emojis) properly.
    """
    subject = "Welcome to Waste2WealthHub!"
    body = f"""
Hi {name},

🎉 Welcome to Waste2WealthHub!
Your account has been successfully created.

You can now log in and access your dashboard.

Regards,
Waste2WealthHub Team
"""

    try:
        # Prepare email message
        msg = MIMEMultipart()
        msg["From"] = SENDER_EMAIL
        msg["To"] = to_email
        msg["Subject"] = Header(subject, 'utf-8')  # encode subject properly
        msg.attach(MIMEText(body, "plain", "utf-8"))

        # Send email using Gmail SMTP
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(SENDER_EMAIL, APP_PASSWORD)
            server.sendmail(SENDER_EMAIL, to_email, msg.as_string().encode('utf-8'))

        print(f"✅ Welcome email sent to {to_email}")
    except smtplib.SMTPAuthenticationError:
        print("❌ Authentication failed. Check your Gmail username and app password.")
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    # Create user
    user = User(
        name=data.get("name"),
        email=email,
        role=data.get("role", "user"),
        phone_number=data.get("phone_number"),
        address=data.get("address")
    )
    user.set_password(data.get("password"))

    # Save to database
    db.session.add(user)
    db.session.commit()

    # Send welcome email
    send_welcome_email(email, user.name)

    # Generate JWT
    token = generate_jwt(user)

    return jsonify({
        "message": "Signup successful",
        "token": token,
        "user": user.to_dict()
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_jwt(user)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": user.to_dict()
    }), 200
