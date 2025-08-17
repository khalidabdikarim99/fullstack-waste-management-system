from app import db

class CollectionRequest(db.Model):
    __tablename__ = "collection_requests"

    id = db.Column(db.Integer, primary_key=True)
    waste_type = db.Column(db.String(120), nullable=False)
    collection_date = db.Column(db.String(50), nullable=False)   # storing as string (YYYY-MM-DD)
    collection_time = db.Column(db.String(50), nullable=False)   # storing as string (HH:MM)
    frequency = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    photo = db.Column(db.String(255), nullable=True)  # just filename for now

    def to_dict(self):
        return {
            "id": self.id,
            "wasteType": self.waste_type,
            "collectionDate": self.collection_date,
            "collectionTime": self.collection_time,
            "frequency": self.frequency,
            "address": self.address,
            "notes": self.notes,
            "quantity": self.quantity,
            "photo": self.photo,
        }
