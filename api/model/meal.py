from mongoengine import *

class Meal(Document):
    participant_id = StringField()
    photo = FileField(unique=True)
    type = StringField()
    portion = StringField()
    

    