from mongoengine import *

class Participant(EmbeddedDocument):
    id = StringField(primary_key=True)
    reg_code = StringField(max_length=8)
    name = StringField()
    email = StringField()
    register_status = StringField()