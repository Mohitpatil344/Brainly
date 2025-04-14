from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import JWT_CONFIG
from routes.auth import auth_bp
from routes.notes import notes_bp
from routes.content import content_bp 
from routes.todo import todo_bp

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

# MongoDB connection
app.config["MONGODB_HOST"] = "mongodb://localhost:27017/brainly"

# JWT Configuration
app.config.update(JWT_CONFIG)
app.config["JWT_IDENTITY_CLAIM"] = "id"  # ✅ Required to match your token

# Initialize extensions
db = MongoEngine(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(notes_bp, url_prefix="/api/notes")
app.register_blueprint(content_bp) 
app.register_blueprint(todo_bp, url_prefix="/api/todo")

@app.route("/")
def home():
    return "Welcome to Brainly Flask Backend!"

if __name__ == "__main__":
    app.run(port=5000, debug=True)
