import falcon, json
from common.constants import ALLOWED_EXTENSIONS
from model.meal import Meal
from model.participant import Participant
from mongoengine import DoesNotExist

def allowed_file(filename):
        return '.' in filename and filename.rsplit('.',1)[1] in ALLOWED_EXTENSIONS
        
class MealResource(object):

    # def __init__(self):

    def on_get_id(self, req, resp,participant_id):
        meal = Meal.objects(participant_id=participant_id)
        # photo = meal.photo.read()

        resp.body = meal.to_json()
        resp.status = falcon.HTTP_200
        
    def on_get_study(self, req, resp, study_id):
        try:
            participant_id_prefix = f'{study_id}_'
            participant_ids = Participant.objects.filter(participant_id__startswith=participant_id_prefix).scalar('id')
            if not participant_ids:
                raise DoesNotExist

            meals = Meal.objects(participant_id__in=participant_ids)
            meals_data = [meal.to_dict() for meal in meals]  # Convert each meal to a dictionary
            resp.body = json.dumps(meals_data)  # Serialize the list of dictionaries to JSON
            resp.status = falcon.HTTP_200

        except DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': f'No participants found for study_id {study_id}',
                'status': 404,
                'data': {}
            })


    def on_post(self, req, resp):
        input_image = req.get_param('image') 
        participant_id = req.get_param('id')
        meal_type = req.get_param('type')
        portion = req.get_param('portion')

        if input_image is None or not input_image.file or \
            not participant_id or not meal_type or not portion:
                resp.status = falcon.HTTP_400
                resp.body = json.dumps({
                    'message': 'Missing required parameters',
                    'status': 400,
                    'data': {}
                })
                return

        if not allowed_file(input_image.filename):
            resp.status = falcon.HTTP_405
            resp.body = json.dumps({
                'message': 'File extension not allowed',
                'status': 405,
                'data': {}
            })
            return

        meal = Meal(participant_id=participant_id, meal_type=meal_type, portion=portion)
        meal.photo.put(input_image.file, content_type=req.content_type)
        meal.save()

        resp.status = falcon.HTTP_201
        resp.body = json.dumps({
            'message': 'Meal successfully created!',
            'status': 201,
            'data': meal.to_dict()
        })

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

    
    