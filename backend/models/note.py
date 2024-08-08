from datetime import datetime
from config import db

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(80), nullable=False, default='My Note')
    content = db.Column(db.Text, nullable=False, default='My Note Content')  # Zmieniona domyślna zawartość
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.now)  # Zmienione na datetime.now bez nawiasów
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)

    def __init__(self, title, content, user_id, project_id):
        self.title = title
        self.content = content
        self.user_id = user_id
        self.project_id = project_id


    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'create_date': self.create_date.isoformat(),
            'user_id': self.user_id
        }
