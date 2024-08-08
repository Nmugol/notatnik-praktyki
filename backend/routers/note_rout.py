from flask import Blueprint, request, jsonify
from config import db

from models import Note

note_router = Blueprint('note', __name__)

@note_router.route('/note', methods=['POST'])
def create_note():
    data = request.get_json()
    note = Note(title=data['title'], content=data['content'], user_id=data['user_id'], project_id=data['project_id'])
    db.session.add(note)
    db.session.commit()
    return note.to_json(), 201


@note_router.route('/note/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note = Note.query.get(note_id)
    if note:
        db.session.delete(note)
        db.session.commit()
        return jsonify({'message': 'Note deleted successfully'})
    else:
        return jsonify({'message': 'Note not found'})
