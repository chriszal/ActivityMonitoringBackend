from typing_extensions import Required
from mongoengine import *
from pkg_resources import require

class Study(Document):
    id = StringField(max_length=5,Required=True)
    deg_code = LongField()
    name = StringField()
    email = StringField()