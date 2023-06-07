from mongoengine import Document, StringField, DateTimeField, IntField, EmailField, ReferenceField
import datetime

class Participant(Document):
    participant_id = StringField(unique=True, required=True)
    reg_code = StringField(max_length=8)
    name = StringField()
    email = StringField()
    date_of_birth = DateTimeField( max=datetime.datetime.now)
    gender = StringField(choices=['male', 'female', 'other'])
    weight = IntField( min_value=0)
    height = IntField(min_value=0)
    register_status = StringField(required=True, choices=['NULL', 'REGISTERED'], default='NULL')
    study = StringField(required=True)

    created_at = DateTimeField(default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': str(self.id),
            'participant_id': self.participant_id,
            'reg_code': self.reg_code,
            'name': self.name,
            'email': self.email,
            'date_of_birth': str(self.date_of_birth),
            'gender': self.gender,
            'weight': self.weight,
            'height': self.height,
            'register_status': self.register_status,
            'study': str(self.study) ,
            'created_at': str(self.created_at)
        }
