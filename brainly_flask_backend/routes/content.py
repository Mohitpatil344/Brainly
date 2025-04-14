from flask import Blueprint, request, jsonify
from models.content import Content
from middleware import user_middleware

content_bp = Blueprint('content', __name__, url_prefix="/api/v1/content")

@content_bp.route("", methods=["POST"])
@user_middleware
def add_content():
    data = request.json
    content = Content(
        title=data["title"],
        link=data["link"],
        type=data["type"],
        userId=request.user_id,  # Using request.user_id set by middleware
        tags=[]
    )
    content.save()
    return jsonify({"message": "Content added"})

@content_bp.route("", methods=["GET"])
@user_middleware
def get_content():
    contents = Content.objects(userId=request.user_id)  # Using request.user_id
    return jsonify({"content": contents})

@content_bp.route("", methods=["DELETE"])
@user_middleware
def delete_content():
    if not request.json or "contentId" not in request.json:
        return jsonify({"message": "Content ID required"}), 400
    
    content_id = request.json.get("contentId")
    Content.objects(id=content_id, userId=request.user_id).delete()  # Using request.user_id
    return jsonify({"message": "Deleted"})