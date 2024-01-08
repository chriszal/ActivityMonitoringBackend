from mongoengine import *
from typing import Optional
import datetime

class Meal(Document):
    participant_id = StringField(required=True)
    photo = FileField(required=True, unique=True)
    meal_type = StringField(
        required=True, 
        choices=['Breakfast', 'Lunch', 'Dinner', 'Snack']
    )
    portion = StringField(required=True,choices=['Small', 'Medium', 'Large'])

    created_at = DateTimeField(default=datetime.datetime.utcnow)

    def to_dict(self):
            return {
                'id': str(self.id),
                'participant_id': self.participant_id,
                'photo_url': f'/api/v1/image/{str(self.photo.grid_id)}' if self.photo.grid_id else None,
                'meal_type': self.meal_type,
                'portion': self.portion,
                'created_at': str(self.created_at)
                }