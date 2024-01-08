import falcon, json
from model.meal import Meal
from mongoengine import DoesNotExist

class ImageResource(object):
    def on_get(self, req, resp, grid_id):
        try:
            meal = Meal.objects.get(photo=grid_id)
            if not meal or not meal.photo:
                raise DoesNotExist

            resp.content_type = 'image/jpeg' 
            resp.body = meal.photo.read()
            resp.status = falcon.HTTP_200
        except DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Image not found',
                'status': 404,
                'data': {}
            })
