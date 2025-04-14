from flask import Blueprint, request, jsonify
from mongoengine import Document, StringField, BooleanField

# Blueprint setup
todo_bp = Blueprint('todo', __name__, url_prefix='/api/todo')

# Todo model
class Todo(Document):
    text = StringField(required=True)
    completed = BooleanField(default=False) 

# Get all todos
@todo_bp.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.objects()
    return jsonify([{"id": str(todo.id), "text": todo.text, "completed": todo.completed} for todo in todos])

# Add a new todo
@todo_bp.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Missing todo text"}), 400

    todo = Todo(text=data['text'])
    todo.save()
    return jsonify({"id": str(todo.id), "text": todo.text, "completed": todo.completed}), 201

# Toggle completion
@todo_bp.route('/todos/<todo_id>', methods=['PATCH'])
def toggle_todo(todo_id):
    todo = Todo.objects(id=todo_id).first()
    if not todo:
        return jsonify({"error": "Todo not found"}), 404

    todo.completed = not todo.completed
    todo.save()
    return jsonify({"id": str(todo.id), "text": todo.text, "completed": todo.completed})

# Delete a todo
@todo_bp.route('/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo = Todo.objects(id=todo_id).first()
    if not todo:
        return jsonify({"error": "Todo not found"}), 404

    todo.delete()
    return jsonify({"message": "Todo deleted successfully"}), 204
