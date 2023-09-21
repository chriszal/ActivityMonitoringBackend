from mongoengine import *
import datetime

class ProcessedSteps(Document):
    participant_id = StringField(required=True)
    chunk_id = StringField(required=True)
    steps_count = IntField()
    start_date = DateTimeField()
    end_date = DateTimeField()
    processed_at = DateTimeField(default=datetime.datetime.utcnow)
    hour = IntField()    
    day = IntField()     
    week = IntField()      
    month = IntField()     
    year = IntField() 

    def to_dict(self):
        return {
            'id': str(self.id) if self.id else None,
            'participant_id': self.participant_id,
            'chunk_id': self.chunk_id,
            'steps_count': self.steps_count,
            'start_date': str(self.start_date),
            'end_date': str(self.end_date),
            'created_at': str(self.processed_at),
            'year': self.year,
            'month': self.month,
            'day': self.day,
            'hour': self.hour,
            'week': self.week
        }
