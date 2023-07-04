from mongoengine import *
import datetime

class ProcessedSteps(Document):
    chunk_id = StringField(required=True)
    steps_count = IntField()
    start_date = DateTimeField()
    end_date = DateTimeField()
    processed_at = DateTimeField(default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': str(self.id),
            'chunk_id': self.chunk_id,
            'start_date': str(self.start_date),
            'end_date': str(self.end_date),
            'created_at': str(self.processed_at)
        }