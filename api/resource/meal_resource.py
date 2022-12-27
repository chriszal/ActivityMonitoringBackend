from http import client
import falcon, json
import requests
from src.common.constants import ALLOWED_EXTENSIONS
from requests.adapters import HTTPAdapter
from src.model.meal import Meal
#from requests.packages.urllib3.util.retry import Retry
from decouple import config

def allowed_file(filename):
        return '.' in filename and filename.rsplit('.',1)[1] in ALLOWED_EXTENSIONS
        
class MealResource(object):

    # def __init__(self):

    def on_get_id(self, req, resp,participant_id):
        meal = Meal.objects(participant_id=participant_id)
        # photo = meal.photo.read()

        resp.body = meal.to_json()
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):

        try:
            input_image = req.get_param('image') 
            participant_id = req.get_param('id')
            type = req.get_param('type')
            portion = req.get_param('portion')
            if input_image.file and allowed_file(input_image.filename):

                meal = Meal(participant_id=participant_id,type=type,portion=portion)
                meal.photo.put(input_image.file, content_type = req.content_type)
                meal.save()

                resp.status = falcon.HTTP_204

                resp.body = json.dumps({
                    'message': (),
                    'status': 204,
                    'data': {}
                })
                return
            else:
                resp.status = falcon.HTTP_405

                resp.body = json.dumps({
                    'message': "File extension not allowed",
                    'status': 405,
                    'data': {}
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

    def on_delete_id(self, req, resp,participant_id):
      try:
        Meal.objects(participant_id=participant_id).delete()
        resp.status = falcon.HTTP_200
        resp.body = json.dumps({
          'message': 'Meals succesfully deleted!',
          'status': 200,
          'body':{}
        })
      except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Paricipant id does not exist. '+str(e),
            'status': 404,
            'data': {}
            }) 

    
    