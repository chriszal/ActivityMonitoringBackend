from mongoengine import *

class Study(Document):
    study_id = StringField(max_length=6,unique=True, required =True)
    title = StringField(required=True)
    authors = ListField()
    description = StringField()
    no_participants = IntField()
    study_coordinators= ListField()
    study_assistants= ListField()
    # status
    #creation date