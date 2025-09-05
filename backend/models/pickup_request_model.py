from datetime import datetime
from .user_model import db, User
# Removed direct import of CollectorStore to avoid circular import

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

    # Relationship to CollectorStore (one-to-one)
    collector_store_entry = db.relationship(
        "CollectorStore",           # string reference instead of direct import
        back_populates="pickup_request",
        uselist=False,
        cascade="all, delete-orphan"  # ensures store entry is deleted if pickup is deleted
    )

    def to_dict(self):
        """Serialize PickupRequest including optional CollectorStore entry"""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "quantity": self.quantity,
            "location": self.location,
            "image_url": self.image_url,
            "notes": self.notes,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "user": {
                "id": self.user.id,
                "name": self.user.name,
                "email": self.user.email,
                "phone_number": self.user.phone_number
            } if self.user else None,
            "collector_store_entry": self.collector_store_entry.to_dict() if self.collector_store_entry else None
        }

    def __repr__(self):
        return f"<PickupRequest {self.id} - {self.status}>"
