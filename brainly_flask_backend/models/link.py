from mongoengine import Document, StringField, ReferenceField
from models.user import User

class Link(Document):
    hash = StringField()
    userId = ReferenceField(User, required=True, unique=True)
