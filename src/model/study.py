from mongoengine import *

from src.model.participant import Participant

class Study(Document):
    study_id = StringField(max_length=6,unique=True, required =True)
    title = StringField(max_length=200, required=True)
    description = StringField()
    no_participants = IntField()
    participants = ListField(EmbeddedDocumentField(Participant))
    