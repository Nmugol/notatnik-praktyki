from flask import Blueprint, request, Response
from config import db, create_jwt
from models import User

user_router = Blueprint('user', __name__)


@user_router.route('/user_login', methods=['POST'])
def get_users():
    data = request.get_json()
    print(data)
    user = User.query.filter_by(token=create_jwt(data['name'], data['password'])).first()
    print(user)
    if user:
        return user.to_json(), 200
    else:
        return {'message': 'User not found'}, 404


@user_router.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    funde_user = User.query.filter_by(name=data['name']).first()
    if funde_user:
        return {'message': 'User already exists'}, 409
    user = User(name=data['name'], password=data['password'], token=create_jwt(data['name'], data['password']))
    db.session.add(user)
    db.session.commit()
    return user.to_json(), 201