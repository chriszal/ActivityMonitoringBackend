import pathlib
from mimetypes import suffix_map
# flake8: noqa
import random
from pretend import stub
import falcon
import mongoengine as mongo
from falcon_multipart.middleware import MultipartMiddleware


import src.common.constants as constants
from src.common.auth_handler import AuthHandler
from src.common.role_handler import RoleBasedPolicy
from src.common.cors import Cors
from src.common.handlers import ExceptionHandler as handler
from src.common.json_translator import JSONTranslator
from src.common.require_json import RequireJSON
from src.resource.login_resource import LoginResource
from src.resource.measurements_resource import MeasurementResource
from src.resource.participant_resource import ParticipantResource
from src.resource.register_resource import RegisterResource
from src.resource.study_resource import StudyResource
from src.resource.user_resource import UserResource
from src.resource.meal_resource import MealResource

mongo.connect(
    constants.MONGO['DATABASE'],
    host=constants.MONGO['HOST'],
    port=constants.MONGO['PORT'],
    username=constants.MONGO['USERNAME'],
    password=constants.MONGO['PASSWORD']
)

STATIC_PATH = pathlib.Path(__file__).parent / 'static'


app = falcon.API(middleware=[MultipartMiddleware()])

study = StudyResource()
user = UserResource()
participant = ParticipantResource()
measurement = MeasurementResource()
meal = MealResource()
register = RegisterResource()
login = LoginResource()



app.add_route("/login", login)
app.add_route('/api/register/{reg_code}',register,suffix="reg_code")
app.add_route('/api/study/', study)
app.add_route('/api/study/{study_id}', study, suffix="id")
app.add_route('/api/user/', user)
app.add_route('/api/user/{username}', user, suffix="username")
app.add_route('/api/participants/{study_id}', participant,suffix="study")
app.add_route('/api/participant/{participant_id}', participant,suffix="id")
app.add_route('/api/measurement/',measurement)
app.add_route('/api/meal/',meal)

app.add_static_route('/static', str(STATIC_PATH))

# global handler exception of application
app.add_error_handler(Exception, handler.handle_500)

# handler for not found resources
app.add_sink(handler.handle_404, '^((?!static).)*$')
