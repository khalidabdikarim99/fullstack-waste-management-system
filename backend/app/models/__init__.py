from flask_sqlalchemy import SQLAlchemy
from .collection_request import CollectionRequest

__all__ = ["CollectionRequest"]



db = SQLAlchemy()
