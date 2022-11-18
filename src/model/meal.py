from mongoengine import *

class Meal(Document):
    participant_id = StringField(unique=True)
    