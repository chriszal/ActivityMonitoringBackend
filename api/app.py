import falcon
import mongoengine as mongo
from falcon_multipart.middleware import MultipartMiddleware
import api.common.constants as constants
from api.common.auth_handler import AuthHandler
from api.common.role_handler import RoleBasedPolicy
from api.common.cors import Cors
from api.common.handlers import ExceptionHandler as handler
from api.common.json_translator import JSONTranslator
from api.common.require_json import RequireJSON
from api.resource.login_resource import LoginResource
from api.resource.measurements_resource import MeasurementResource
from api.resource.participant_resource import ParticipantResource
from api.resource.register_participant_resource import RegisterParticipantResource
from api.resource.study_resource import StudyResource
from api.resource.user_resource import UserResource
from api.resource.meal_resource import MealResource
import json 

mongo.connect(
    constants.MONGO['DATABASE'],
    host=constants.MONGO['HOST'],
    port=constants.MONGO['PORT'],
    username=constants.MONGO['USERNAME'],
    password=constants.MONGO['PASSWORD'],

)

# cors = CORS(allow_origins_list=['http://0.0.0.0:3000'],allow_headers_list=['Content-Type'])
# ,AuthHandler(),RoleBasedPolicy(constants.policy_config)
app = falcon.API(middleware=[Cors(),MultipartMiddleware()])

study = StudyResource()
user = UserResource()
participant = ParticipantResource()
measurement = MeasurementResource()
meal = MealResource()
register = RegisterParticipantResource()
login = LoginResource()



app.add_route("/api/v1/login", login)
app.add_route('/api/v1/participant/register/{reg_code}',register,suffix="reg_code")
app.add_route('/api/v1/is-token-valid/{token}', user,suffix="token")
app.add_route('/api/v1/user/register/{token}', user,suffix="user_by_token")
app.add_route('/api/v1/studies', study)
app.add_route('/api/v1/studies/user/{user_id}', study, suffix="user_id")
app.add_route('/api/v1/study/{study_id}', study, suffix="id")
app.add_route('/api/v1/users', user)
app.add_route('/api/v1/user/register', user,suffix="token")
app.add_route('/api/v1/users/{email}', user, suffix="email")
app.add_route('/api/v1/user/id/{email}', user, suffix="id_by_email")
app.add_route('/api/v1/user/{id}', user, suffix="id")
app.add_route('/api/v1/participants', participant)
# app.add_route('/api/v1/participants/{study}', participant)
app.add_route('/api/v1/participants/study/{study_id}', participant,suffix="study")
app.add_route('/api/v1/participant/{participant_id}', participant,suffix="id")
app.add_route('/api/v1/measurement/',measurement)
app.add_route('/api/v1/meal/',meal)
app.add_route('/api/v1/meals/participant/{participant_id}',meal,suffix="id")


