from config import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False, default='My Project')
    description = db.Column(db.Text, nullable=False, default='My Project Description')  # Zmieniony domyślny opis
    notes = db.relationship('Note', backref='project', lazy=True)
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
