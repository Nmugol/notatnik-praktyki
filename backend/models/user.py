from .user_project import user_project
from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False, default='John Doe')
    password = db.Column(db.String(80), nullable=False)
    token = db.Column(db.Text, nullable=False)
    notes = db.relationship('Note', backref='author', lazy=True)
    projects = db.relationship('Project', secondary=user_project, backref=db.backref('users', lazy=True))

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'token': self.token
        }
