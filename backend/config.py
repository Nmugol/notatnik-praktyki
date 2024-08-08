from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt

app = Flask(__name__)
CORS(app)
secret = 'secret_key'

# Configuration for the MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://myuser:mypassword@172.18.0.3/notatnik'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

def create_jwt(name, password):
    return jwt.encode({'name': name, 'password': password}, secret, algorithm='HS256')