from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Import db from user_model to use single db instance
from .user_model import db, User

class PickupRequest(db.Model):
    __tablename__ = "pickup_requests"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    quantity = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255))
    notes = db.Column(db.Text)
    status = db.Column(db.String(50), nullable=False, default="Pending")  # Pending, Accepted, Completed, Deleted
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship back to User
    user = db.relationship("User", back_populates="pickup_requests")

    def __repr__(self):
        return f"<PickupRequest {self.id} - {self.status}>"
