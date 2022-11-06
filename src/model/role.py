from mongoengine import *
from src.model.user import User

class Role(Document):
    name = StringField()
    permissions = ListField()

