from enum import unique
from mongoengine import *

class Participant(Document):
    participant_id = StringField(unique=True)
    reg_code = StringField(max_length=8)
    name = StringField()
    email = StringField()
    date_of_birth = DateTimeField()
    gender = StringField()
    weight = IntField()
    height = IntField()
    register_status = StringField()
    study_id = StringField()