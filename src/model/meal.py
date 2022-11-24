from mongoengine import *

class Meal(Document):
    participant_id = StringField(unique=True)
    photo = FileField()
    type = StringField()
    portion = StringField()
    

    