import falcon, json
from model.meal import Meal
from mongoengine import DoesNotExist
from common.constants import ALLOWED_EXTENSIONS

class ImageResource(object):
    def on_get(self, req, resp, meal_id):
        try:
            meal = Meal.objects.get(id=meal_id)
            if not meal or not meal.photo:
                raise DoesNotExist

            # Default content type
            content_type = 'image/jpeg'

            # Check if filename is not None and has an extension
            if meal.photo.filename and '.' in meal.photo.filename:
                file_extension = meal.photo.filename.rsplit('.', 1)[1].lower()
                if file_extension in ALLOWED_EXTENSIONS:
                    content_type = f'image/{file_extension}'

            resp.content_type = content_type
            resp.body = meal.photo.read()
            resp.status = falcon.HTTP_200
        except DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Image not found',
                'status': 404,
                'data': {}
            })
