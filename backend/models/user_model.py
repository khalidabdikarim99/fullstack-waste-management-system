from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()  # single instance

class User(db.Model):
    __tablename__ = "users"  # ensure ForeignKey matches this

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')  # user, collector, recycler, employer
    phone_number = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(255))
    status = db.Column(db.String(20), nullable=False, default='pending')  # pending, accepted, deleted
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to PickupRequest (one-to-many)
    pickup_requests = db.relationship(
        "PickupRequest",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy=True
    )

    def __repr__(self):
        return f"<User {self.email} - {self.role} - {self.status}>"
