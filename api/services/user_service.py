from src.model.user import User
from mongoengine.queryset.visitor import Q


class UserService(object):

    @staticmethod
    def create_user(first_name, sur_name,email, username, password, roles):
        """
        Create a new user
        """

        user = User(first_name=first_name, sur_name=sur_name,email=email, username=username,
                    password=User.set_password(password), roles=roles).save()
        return user

    @staticmethod
    def modify_user(User):
        User.update(set__study_id=str(User.name))

    @staticmethod
    def list_users():
        """
        Get created projects
        :return:
        :rtype:
        """
        return User.objects()

    @staticmethod
    def get_user(username, password):
        """
        Get created projects
        :return:
        :rtype:
        """
        user = User.objects.get(username=username)
        if User.validate_login(user.password, password):
            return user
        else:
            return None

    @staticmethod
    def delete_user(username):
        """
        Delete the study
        """
        User.objects(username=username).delete()
