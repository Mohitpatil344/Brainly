# routes/notes.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.note import Note
from datetime import datetime

notes_bp = Blueprint('notes', __name__)

@notes_bp.route('/', methods=['POST'])
@jwt_required()
def create_note():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()

        required_fields = ['title', 'content']
        if not all(field in data for field in required_fields):
            return jsonify({'message': 'Missing required fields'}), 400

        note = Note(
            user_id=user_id,
            title=data['title'],
            content=data['content'],
            category=data.get('category', 'Other'),
            is_pinned=data.get('is_pinned', False),
            link=data.get('link', '')
        ).save()

        return jsonify({'message': 'Note created successfully', 'note': note.to_dict()}), 201

    except Exception as e:
        return jsonify({'message': str(e)}), 500


@notes_bp.route('/', methods=['GET'])
@jwt_required()
def get_notes():
    try:
        user_id = get_jwt_identity()
        search = request.args.get('search', '')
        category = request.args.get('category', '')

        query = {'user_id': user_id}

        if search:
            query['$text'] = {'$search': search}
        if category:
            query['category'] = category

        notes = Note.objects(__raw__=query).order_by('-is_pinned', '-created_at')

        return jsonify({'notes': [note.to_dict() for note in notes]}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500


@notes_bp.route('/<note_id>', methods=['GET'])
@jwt_required()
def get_note(note_id):
    try:
        user_id = get_jwt_identity()
        note = Note.objects(id=note_id, user_id=user_id).first()

        if not note:
            return jsonify({'message': 'Note not found'}), 404

        return jsonify({'note': note.to_dict()}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500


@notes_bp.route('/<note_id>', methods=['PUT'])
@jwt_required()
def update_note(note_id):
    try:
        user_id = get_jwt_identity()
        data = request.get_json()

        note = Note.objects(id=note_id, user_id=user_id).first()
        if not note:
            return jsonify({'message': 'Note not found'}), 404

        updates = {
            'title': data.get('title', note.title),
            'content': data.get('content', note.content),
            'category': data.get('category', note.category),
            'is_pinned': data.get('is_pinned', note.is_pinned),
            'link': data.get('link', note.link)
        }

        note.update(**updates)
        note.reload()

        return jsonify({'message': 'Note updated successfully', 'note': note.to_dict()}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500


@notes_bp.route('/<note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    try:
        user_id = get_jwt_identity()
        note = Note.objects(id=note_id, user_id=user_id).first()

        if not note:
            return jsonify({'message': 'Note not found'}), 404

        note.delete()
        return jsonify({'message': 'Note deleted successfully'}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500


@notes_bp.route('/<note_id>/pin', methods=['PUT'])
@jwt_required()
def toggle_pin(note_id):
    try:
        user_id = get_jwt_identity()
        note = Note.objects(id=note_id, user_id=user_id).first()

        if not note:
            return jsonify({'message': 'Note not found'}), 404

        note.update(is_pinned=not note.is_pinned)
        note.reload()

        return jsonify({'message': 'Note pin status updated', 'note': note.to_dict()}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500
