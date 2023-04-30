import falcon
import json

from api.model.user import User
from api.services.user_service import UserService

class UserResource(object):

    def __init__(self):
        """
        Constructor method to initialize the UserResource class with an instance of UserService.
        """
        self.user_service = UserService()

    def on_get(self, req, resp):
        """
        HTTP GET request method to retrieve a list of all users.
        """
        resp.status = falcon.HTTP_200
        users = self.user_service.list_users()
        # Convert the list of User objects to a list of dictionary objects
        users_dict = [user.to_dict() for user in users]
        resp.body = json.dumps(users_dict)

    def on_post(self, req, resp):
        """
        HTTP POST request method to create a new user with the given user data.
        """
        try:
            user_data = req.media
            # Create a new user object using the user_service and the provided user data
            user_obj = self.user_service.create_user(**user_data)
            resp.status = falcon.HTTP_201
            resp.body = json.dumps({
                'message': 'User successfully created!',
                'status': 201,
                'data': user_obj.to_dict()
            })
        except Exception as e:
            # If an error occurs while creating the user, return a 409 status code with an error message
            resp.status = falcon.HTTP_409
            resp.body = json.dumps({
                'message': str(e),
                'status': 409,
                'data': {}
            })
            return

    def on_get_email(self, req, resp, email):
        """
        HTTP GET request method to retrieve the user object with the given email address.
        """
        try:
            user_obj = self.user_service.get_user_by_email(email)
            resp.body = json.dumps(user_obj.to_dict())
            resp.status = falcon.HTTP_200
        except User.DoesNotExist:
            # If the user does not exist, return a 404 status code with an error message
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'User does not exist.',
                'status': 404,
                'data': {}
            })

    def on_put_email(self, req, resp, email):
        """
        HTTP PUT request method to update the user object with the given email address using the provided user data.
        """
        user_data = req.media
        try:
            # Update the user object using the user_service and the provided user data
            user_obj = self.user_service.update_user_by_email(email, **user_data)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps({
                'message': 'User successfully updated!',
                'status': 200,
                'data': user_obj.to_dict()
            })
        except User.DoesNotExist:
            # If the user does not exist, return a 404 status code with an error message
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'User does not exist.',
                'status': 404,
                'data': {}
            })

    def on_delete_email(self, req, resp, email):
        """
        HTTP DELETE request method to delete the user object with the given email address.
        """
        try:
        # Delete the user object using the user_service and the provided email address
                self.user_service.delete_user_by_email(email)
                resp.status = falcon.HTTP_204
                resp.body = json.dumps({
                    'message': 'User successfully deleted!',
                    'status': 204,
                    'data': {}
                })
        except User.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'User does not exist.',
                'status': 404,
                'data': {}
            })
                
    def on_get_id(self, req, resp, id):
            try:
                user_obj = self.user_service.get_user_by_id(id)
                resp.body = json.dumps({
                    'email': user_obj.email
                })
                resp.status = falcon.HTTP_200
            except User.DoesNotExist:
                resp.status = falcon.HTTP_404
                resp.body = json.dumps({
                    'message': 'User does not exist.',
                    'status': 404,
                    'data': {}
                })

    def on_get_id_by_email(self, req, resp, email):
            try:
                user_obj = self.user_service.get_user_id_by_email(email)
                resp.body = json.dumps({
                    'id': str(user_obj.id)
                })
                resp.status = falcon.HTTP_200
            except User.DoesNotExist:
                resp.status = falcon.HTTP_404
                resp.body = json.dumps({
                    'message': 'User does not exist.',
                    'status': 404,
                    'data': {}
                })
