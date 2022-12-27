import falcon, json

from src.model.user import User
from src.services.user_service import UserService

class UserResource(object):


    def __init__(self):
        self.user_service = UserService()

    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        users = self.user_service.list_users()
       
        resp.body = users.to_json()

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
            #req.media will deserialize json object
            user_obj= self.user_service.create_user(**user_data)
            resp.status = falcon.HTTP_201
            resp.body = json.dumps({
              'message': 'User succesfully created!',
              'status': 201,
              'data': str(user_obj.username)
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

    def on_get_username(self,req,resp,username):

        try:

          user_obj= self.user_service.get_user(username)
          
          resp.body = user_obj.to_json()
          resp.status = falcon.HTTP_200
        except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Username does not exist.',
            'status': 404,
            'data': {}
            }) 

    def on_delete_username(self, req, resp,username):
      try:
        self.user_service.delete_user(username)
        resp.status = falcon.HTTP_200
        resp.body = json.dumps({
          'message': 'User succesfully deleted!',
          'status': 200,
          'body':{}
        })
      except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Username does not exist.',
            'status': 404,
            'data': {}
            }) 
        
        