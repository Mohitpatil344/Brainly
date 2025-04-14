from flask import request, jsonify
import jwt
from functools import wraps
from config import JWT_PASSWORD

def user_middleware(func):
    @wraps(func)  # Preserves function metadata
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"message": "You are not logged in"}), 403
        
        token = auth_header.replace("Bearer ", "").strip()
        try:
            decoded = jwt.decode(token, JWT_PASSWORD, algorithms=["HS256"])
            # Set user_id directly on the request object
            request.user_id = decoded["id"]  
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 403
        except Exception as e:
            return jsonify({"message": f"Error processing token: {str(e)}"}), 500

        return func(*args, **kwargs)
    
    return wrapper