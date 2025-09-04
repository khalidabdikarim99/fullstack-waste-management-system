import os
from dotenv import load_dotenv

# Load environment variables from .env
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, ".env"))

class Config:
    # Secret key for session management
    SECRET_KEY = os.environ.get("SECRET_KEY") or "supersecretkey"

    # SQLite DB configuration with absolute path
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "instance", "database.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable track modifications to save memory

    # Email configuration (example: Gmail)
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")  # e.g., waste2wealthhub@gmail.com
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")  # Gmail App Password
