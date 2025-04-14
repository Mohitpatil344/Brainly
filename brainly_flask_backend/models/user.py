from flask_mongoengine import MongoEngine
from mongoengine import Document, StringField

db = MongoEngine()

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
