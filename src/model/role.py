from mongoengine import *

class Role(Document):
    role = StringField(primary_key=True)
    user = StringField(ReferenceField('User'),primary_key=True)