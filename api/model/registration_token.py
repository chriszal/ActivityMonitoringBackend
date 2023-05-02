from mongoengine import *

class RegistrationToken(Document):
    token = StringField( unique=True, required=True)
    used = BooleanField(default=False)