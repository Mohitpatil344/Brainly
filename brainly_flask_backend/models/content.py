from mongoengine import Document, StringField, ListField, ReferenceField
from models.user import User

class Content(Document):
    title = StringField()
    link = StringField()
    type = StringField()
    userId = ReferenceField(User, required=True)
    tags = ListField()
