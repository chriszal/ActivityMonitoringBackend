from model.user import User
from model.registration_token import RegistrationToken

class UserService:

    def create_user(self, first_name, last_name, email, password, roles):
        user = User(first_name=first_name, last_name=last_name,
                    email=email, roles=roles)
        user.set_password(password)
        user.save()
        return user

    def list_users(self):
        return User.objects.all()

    def get_user_by_email(self, email):
        return User.objects.get(email=email)

    def update_user_by_email(self, mail, **kwargs):
        user = User.objects.get(email=mail)
        for key, value in kwargs.items():
            setattr(user, key, value)
        user.save()
        return user

    def delete_user_by_email(self, email):
        user = User.objects.get(email=email)
        user.delete()

    def get_user_by_id(self, id):
        return User.objects.get(id=id)

    def get_user_id_by_email(self, email):
        return User.objects.get(email=email)

    def user_exists(self, email):
        try:
            user = User.objects.get(email=email)
            return True
        except User.DoesNotExist:
            return False

    def create_token(self,token):
        registration_token = RegistrationToken(token=token,used=False)
        registration_token.save()
        return registration_token

    def update_token(self, token):
        registration_token = RegistrationToken.objects.get(token=token)
        registration_token.used = True
        registration_token.save()
        return registration_token

    def is_token_used(self, token):
        registration_token = RegistrationToken.objects.get(token=token)
        return registration_token.used