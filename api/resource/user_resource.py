import falcon
import json

from api.model.user import User
from api.services.user_service import UserService

class UserResource(object):

    def __init__(self):
        self.user_service = UserService()

    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        users = self.user_service.list_users()
        users_dict = [user.to_dict() for user in users]
        resp.body = json.dumps(users_dict)

    def on_post(self, req, resp):
        try:
            user_data = req.media
            if "study_coordinator" in req.context.roles and ("admin" in user_data["roles"] or "study_coordinator" in user_data["roles"]):
                resp.status = falcon.HTTP_401
                resp.body = json.dumps({
                    'message': 'Not authorized to create an admin or a coordinator.',
                    'status': 401,
                    'data': {}
                })
                return
            else:
                user_obj = self.user_service.create_user(**user_data)
                resp.status = falcon.HTTP_201
                resp.body = json.dumps({
                    'message': 'User successfully created!',
                    'status': 201,
                    'data': user_obj.to_dict()
                })
                return
          
        except Exception as e:
            resp.status = falcon.HTTP_409
            resp.body = json.dumps({
                'message': str(e),
                'status': 409,
                'data': {}
            })
            return

    def on_get_email(self, req, resp, email):
        try:
            user_obj = self.user_service.get_user_by_email(email)
            resp.body = json.dumps(user_obj.to_dict())
            resp.status = falcon.HTTP_200
        except User.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'User does not exist.',
                'status': 404,
                'data': {}
            })

    def on_put_email(self, req, resp, email):
        try:
            user_data = req.media
            user_obj = self.user_service.update_user_by_email(email, **user_data)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps({
                'message': 'User successfully updated!',
                'status': 200,
                'data': user_obj.to_dict()
            })
        except User.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'User does not exist.',
                'status': 404,
                'data': {}
            })

    def on_delete_email(self, req, resp, email):
            try:
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
