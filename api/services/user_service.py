from api.model.user import User


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
