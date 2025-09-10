from models.user_model import db
from datetime import datetime

class AdminStore(db.Model):
    __tablename__ = "admin_store"

    id = db.Column(db.Integer, primary_key=True)
    recycler_id = db.Column(db.Integer, nullable=False)  # reference to original recycler
    fullname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship(
        "AdminProcessedItem",
        backref="admin_store",
        lazy=True,
        cascade="all, delete-orphan"  # ensures deleted items are removed from DB
    )


class AdminProcessedItem(db.Model):
    __tablename__ = "admin_processed_items"

    id = db.Column(db.Integer, primary_key=True)
    admin_store_id = db.Column(db.Integer, db.ForeignKey("admin_store.id"), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    company_name = db.Column(db.String(120), nullable=False)
    processed_date = db.Column(db.Date, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.Text, nullable=True)
    approved = db.Column(db.Boolean, default=False)
    deleted = db.Column(db.Boolean, default=False)
