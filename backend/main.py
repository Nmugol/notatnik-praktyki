from config import app, create_jwt, db
from models import Project, User, Note, user_project
from routers import note_router, user_router, project_router

app.register_blueprint(note_router)
app.register_blueprint(user_router)
app.register_blueprint(project_router)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        db.session.commit()
    app.run(debug=True)

