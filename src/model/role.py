from mongoengine import *
from src.model.user import User

class Role(Document):
    role = StringField(required=True,unique=True)
    users = ListField(ReferenceField(User))
    permissions = ListField(StringField())