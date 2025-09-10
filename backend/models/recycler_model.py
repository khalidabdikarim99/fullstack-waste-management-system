from models.user_model import db  # Import db from your existing user_model

class Recycler(db.Model):
    __tablename__ = "recyclers"

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(120), nullable=False)

    items = db.relationship("ProcessedItem", backref="recycler", lazy=True)


class ProcessedItem(db.Model):
    __tablename__ = "processed_items"

    id = db.Column(db.Integer, primary_key=True)
    recycler_id = db.Column(db.Integer, db.ForeignKey("recyclers.id"), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    company_name = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.Text, nullable=True)  # updated column
    processed_date = db.Column(db.Date, nullable=False)
    notes = db.Column(db.Text, nullable=True)
