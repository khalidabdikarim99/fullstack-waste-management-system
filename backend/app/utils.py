from flask_jwt_extended import create_access_token
from datetime import timedelta

def generate_jwt(user):
    token = create_access_token(identity={"id": user.id, "role": user.role}, expires_delta=timedelta(days=1))
    return token
