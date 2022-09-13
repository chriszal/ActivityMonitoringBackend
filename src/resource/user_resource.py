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
  
          resp.status = falcon.HTTP_201
          user_data = req.media
         
          #req.media will deserialize json object
          user_obj= self.user_service.create_user(**user_data)
          resp.body = json.dumps({
            'message': 'User succesfully created!',
            'status': 201,
            'data': str(user_obj.username)
          })
          return
          
        except Exception as e:
           
            resp.status = falcon.HTTP_400
            resp.body = json.dumps({
            'message': str(e),
            'status': 400,
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

        resp.body = json.dumps({
          'message': 'User succesfully deleted!',
          'status': 204,
          'body':{}
        })
      except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Username does not exist.',
            'status': 404,
            'data': {}
            }) 
        
        