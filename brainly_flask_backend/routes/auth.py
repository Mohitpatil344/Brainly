from flask import Blueprint, request, jsonify
from models.user import User
import jwt
from config import JWT_PASSWORD
# from flask_cors import CORS  # ✅ Add this

auth_bp = Blueprint('auth', __name__)  # ❌ Remove url_prefix="/api/v1"



@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    try:
        User(username=data["username"], password=data["password"]).save()
        return jsonify({"message": "User signed up"})
    except:
        return jsonify({"message": "User already exists"}), 411

@auth_bp.route("/signin", methods=["POST"])
def signin():

    data = request.json
    user = User.objects(username=data["username"], password=data["password"]).first()
    if user:
        token = jwt.encode({"id": str(user.id)}, JWT_PASSWORD, algorithm="HS256")
        return jsonify({"token": token})
    return jsonify({"message": "Incorrect credentials"}), 403
