# models/note.py

from mongoengine import Document, fields
from datetime import datetime

class Note(Document):
    user_id = fields.StringField(required=True)
    title = fields.StringField(required=True)
    content = fields.StringField(required=True)
    category = fields.StringField(default='Other')
    is_pinned = fields.BooleanField(default=False)
    link = fields.StringField(default='')
    created_at = fields.DateTimeField(default=datetime.utcnow)
    updated_at = fields.DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'notes',
        'indexes': [
            'user_id',
            'is_pinned',
            'created_at',
            # Proper text index for MongoDB
            {
                'fields': ['$title', '$content'],
                'default_language': 'english',
                'weights': {'title': 10, 'content': 5}
            }
        ]
    }

    def to_dict(self):
        return {
            'id': str(self.id),
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'category': self.category,
            'is_pinned': self.is_pinned,
            'link': self.link,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Note, self).save(*args, **kwargs)