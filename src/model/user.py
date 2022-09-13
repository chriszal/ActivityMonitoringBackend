from mongoengine import *
from src.model.study import Study

class User(Document):
    first_name = StringField()
    sur_name = StringField()
    username = StringField(unique=True,required=True)
    password = StringField()
    study_id = ListField(ReferenceField(Study))
