from flask import Blueprint, jsonify, request
from config import db
from models import Project, user_project, User, Note

project_router = Blueprint('project', __name__)

@project_router.route('/project', methods=['POST'])
def create_project():
    data = request.get_json()
    project_name = data.get('name', 'My Project')
    project_description = data.get('description', 'My Project Description')
    user_id = data.get('user_id')

    # Tworzenie nowego projektu
    new_project = Project(name=project_name, description=project_description)

    # Pobieranie użytkownika
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # Dodanie projektu do listy projektów użytkownika
    user.projects.append(new_project)

    # Zapisanie zmian w bazie danych
    db.session.add(new_project)
    db.session.commit()

    return jsonify(new_project.to_json()), 201


@project_router.route('/project', methods=['GET'])
def get_projects():
    user_id = request.args.get('user_id')

    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    projects = user.projects
    return jsonify([project.to_json() for project in projects])


@project_router.route('/project/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get(project_id)
    if project:
        # Usuwanie notatek powiązanych z projektem
        for note in Note.query.filter_by(project_id=project_id).all():
            db.session.delete(note)
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Project deleted successfully'})
    else:
        return jsonify({'message': 'Project not found'})
    
@project_router.route('/project_all_notes', methods=['GET'])
def get_all_notes():
    project_id = request.args.get('project_id')
    nouts = Note.query.filter_by(project_id=project_id).all()
    return jsonify([note.to_json() for note in nouts])