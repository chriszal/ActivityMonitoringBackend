from mongoengine import *
from pkg_resources import require

from src.model.participant import Participant


class Study(Document):
    id = StringField(max_length=6,primary_key=True)
    title = StringField(max_length=200, required=True)
    description = StringField()
    no_participants = IntField()
    participants = ListField(EmbeddedDocumentField(Participant))