from src.model.user import User
import random
import string

class UserService(object):
    @staticmethod
    def create_user(first_name,sur_name,username,password):
        """
        Create a new user
        """

        user = User(first_name=first_name,sur_name=sur_name,username=username,password=password).save()
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
    def get_user(username):
        """
        Get created projects
        :return:
        :rtype:
        """
        return User.objects.get(username=username)

    @staticmethod
    def delete_user(username):
        """
        Delete the study
        """
        User.objects(username=username).delete()