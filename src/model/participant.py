from mongoengine import *

class Participant(EmbeddedDocument):
    id = StringField()
    reg_code = StringField(max_length=8)
    name = StringField()
    email = StringField()