from flask import Blueprint, request, jsonify
from models.link import Link
from models.content import Content
from models.user import User
from utils import random_string
from middleware import user_middleware

brain_bp = Blueprint('brain', __name__, url_prefix="/api/v1")

@brain_bp.route("/brain/share", methods=["POST"])
@user_middleware
def share_brain():
    share = request.json.get("share")
    if share:
        link = Link.objects(userId=request.user_id).first()
        if link:
            return jsonify({"hash": link.hash})
        hash_val = random_string(10)
        Link(hash=hash_val, userId=request.user_id).save()
        return jsonify({"hash": hash_val})
    else:
        Link.objects(userId=request.user_id).delete()
        return jsonify({"message": "Removed link"})

@brain_bp.route("/brain/<share_link>", methods=["GET"])
def get_shared_brain(share_link):
    link = Link.objects(hash=share_link).first()
    if not link:
        return jsonify({"message": "Sorry incorrect input"}), 411

    user = User.objects(id=link.userId.id).first()
    if not user:
        return jsonify({"message": "User not found"}), 411

    contents = Content.objects(userId=link.userId.id)
    return jsonify({"username": user.username, "content": contents})
