from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password):
    """Hash a plain password."""
    return generate_password_hash(password)

def verify_password(password, hashed):
    """Verify a plain password against its hash."""
    return check_password_hash(hashed, password)
