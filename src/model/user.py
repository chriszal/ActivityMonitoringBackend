from mongoengine import *
from src.model.study import Study

class User(Document):
    first_name = StringField()
    last_name = StringField()
    username = StringField()
    password = StringField()
    study_id = StringField(ReferenceField(Study))
