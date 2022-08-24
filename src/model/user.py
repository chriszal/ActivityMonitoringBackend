from typing_extensions import Required
from mongoengine import *


class User(Document):
    first_name = StringField(Required=True)
    last_name = StringField(Required=True)
