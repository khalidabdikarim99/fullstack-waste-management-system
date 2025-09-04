from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .user_model import db, User

class PickupConfirmation(db.Model):
    __tablename__ = "pickup_confirmations"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    waste_type = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    amount_paid = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    collector_name = db.Column(db.String(100), nullable=False)
    collector_email = db.Column(db.String(100), nullable=False)
    collector_phone = db.Column(db.String(20), nullable=False)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to User
    user = db.relationship("User", backref="pickup_confirmations")
