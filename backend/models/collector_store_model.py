from datetime import datetime
from .user_model import db, User
# Removed direct import of PickupRequest to avoid circular import

class CollectorStore(db.Model):
    __tablename__ = "collector_store"

    id = db.Column(db.Integer, primary_key=True)
    pickup_request_id = db.Column(
        db.Integer,
        db.ForeignKey("pickup_requests.id", ondelete="CASCADE"),
        nullable=False,
        unique=True  # one-to-one relationship
    )
    collector_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )
    stored_quantity = db.Column(db.String(100), nullable=False)
    stored_at = db.Column(db.DateTime, default=datetime.utcnow)
    sent_to_recycler = db.Column(db.Boolean, default=False)

    # NEW fields for recycler actions
    accepted = db.Column(db.Boolean, default=False)
    deleted = db.Column(db.Boolean, default=False)

    # Relationship back to PickupRequest using string reference
    pickup_request = db.relationship(
        "PickupRequest",
        back_populates="collector_store_entry"
    )

    # Link back to collector user
    collector = db.relationship("User", backref="stored_pickups", foreign_keys=[collector_id])

    def to_dict(self):
        """Serialize collector store entry including nested collector and pickup details"""
        return {
            "id": self.id,
            "pickup_request_id": self.pickup_request_id,
            "stored_quantity": self.stored_quantity,
            "stored_at": self.stored_at.isoformat() if self.stored_at else None,
            "sent_to_recycler": self.sent_to_recycler,
            "accepted": self.accepted,
            "deleted": self.deleted,
            "collector_id": self.collector_id,
            "collector": {
                "id": self.collector.id,
                "name": self.collector.name,
                "email": self.collector.email,
                "phone_number": self.collector.phone_number,
            } if self.collector else None,
            "pickup_request": {
                "id": self.pickup_request.id,
                "quantity": self.pickup_request.quantity,
                "location": getattr(self.pickup_request.user, "address", None) or self.pickup_request.location,
                "notes": self.pickup_request.notes,
                "image_url": self.pickup_request.image_url,
                "status": self.pickup_request.status,
                "user": {
                    "id": self.pickup_request.user.id,
                    "name": self.pickup_request.user.name,
                    "email": self.pickup_request.user.email,
                    "phone_number": self.pickup_request.user.phone_number,
                } if self.pickup_request.user else None
            } if self.pickup_request else None
        }

    def __repr__(self):
        return f"<CollectorStore {self.id} - PickupRequest {self.pickup_request_id}>"
