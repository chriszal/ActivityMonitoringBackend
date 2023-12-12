from mongoengine import Document, StringField, ListField, IntField


class Study(Document):
    study_id = StringField(max_length=6, unique=True, required=True)
    title = StringField(required=True)
    description = StringField(required=True)
    no_participants = IntField(required=True)
    owners = ListField(StringField(unique=True), required=True)
    study_coordinators = ListField(StringField(unique=True))
    study_assistants = ListField(StringField(unique=True))

    def to_dict(self):
        return {
            'id': str(self.id),
            'study_id': self.study_id,
            'title': self.title,
            'description': self.description,
            'no_participants': self.no_participants,
            'owners': self.owners,
            'study_coordinators': self.study_coordinators,
            'study_assistants': self.study_assistants
        }
