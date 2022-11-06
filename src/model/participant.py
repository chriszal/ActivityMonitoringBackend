from enum import unique
from mongoengine import *

class Participant(Document):
    participant_id = StringField(unique=True)
    reg_code = StringField(max_length=8)
    name = StringField()
    email = StringField()
    register_status = StringField()
    study_id = StringField()