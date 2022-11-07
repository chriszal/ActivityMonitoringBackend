from mongoengine import *
import datetime
import bcrypt

class User(Document):
    first_name = StringField()
    sur_name = StringField()
    email = StringField()
    username = StringField(unique=True,required=True)
    password = BinaryField() 
    roles = ListField()
    created_at = DateTimeField(default=datetime.datetime.now())



    def set_password(password):
        password = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        return password

    @staticmethod
    def validate_login(old, password):
        return bcrypt.checkpw(password.encode('utf-8'),old)
