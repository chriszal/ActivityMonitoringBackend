import falcon
import mongoengine as mongo
from falcon_multipart.middleware import MultipartMiddleware
from common import constants
from common.auth_handler import AuthHandler
from common.role_handler import RoleBasedPolicy
from common.cors import Cors
from common.handlers import ExceptionHandler as handler
from common.json_translator import JSONTranslator
from common.require_json import RequireJSON
from resource.login_resource import LoginResource
from resource.measurements_resource import MeasurementResource
from resource.participant_resource import ParticipantResource
from resource.steps_resource import StepsResource
from resource.register_participant_resource import RegisterParticipantResource
from resource.study_resource import StudyResource
from resource.user_resource import UserResource
from resource.meal_resource import MealResource
from services.rabbitmq import RabbitMQ



from falcon_swagger_ui import register_swaggerui_app
import logging

logging.basicConfig(
        format='%(asctime)s %(message)s',
        datefmt='%m/%d/%Y %I:%M:%S %p',
        level=logging.INFO
    )


mongo.connect(
    constants.MONGO['DATABASE'],
    host=constants.MONGO['HOST'],
    port=constants.MONGO['PORT'],
    username=constants.MONGO['USERNAME'],
    password=constants.MONGO['PASSWORD'],

)

rabbitMQ_instance = RabbitMQ(
    host=constants.RABBITMQ['HOST'],
    username=constants.RABBITMQ['USERNAME'],
    password=constants.RABBITMQ['PASSWORD'],
    exchange=constants.RABBITMQ['EXCHANGE']
)



# cors = CORS(allow_origins_list=['http://0.0.0.0:3000'],allow_headers_list=['Content-Type'])
# ,AuthHandler(),RoleBasedPolicy(constants.policy_config)
app = falcon.App(middleware=[Cors(),MultipartMiddleware()])

study = StudyResource()
user = UserResource()
participant = ParticipantResource(logging)
measurement = MeasurementResource(rabbitMQ_instance,constants.INFLUXDB,logging)
meal = MealResource(logging)
register = RegisterParticipantResource(logging)
login = LoginResource()
steps = StepsResource(logging)



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
app.add_route('/api/v1/participant/invitation', participant,suffix="participant_invitation")
# app.add_route('/api/v1/participants/create/{study}', participant)
app.add_route('/api/v1/participants/study/{study_id}', participant,suffix="study")
app.add_route('/api/v1/registered/participants/study/{study_id}', participant,suffix="registered")
app.add_route('/api/v1/participant/{participant_id}', participant,suffix="id")
app.add_route('/api/v1/measurement',measurement)
app.add_route('/api/v1/upload-meal',meal)
app.add_route('/api/v1/meals/study/{study_id}',meal,suffix="study")
app.add_route('/api/v1/meals/participant/{participant_id}',meal,suffix="id")
app.add_route('/api/v1/participant/steps',steps)
app.add_route('/api/v1/participants/priority/study/{study_id}', participant, suffix="priority")

# Add health check endpoint

class HealthResource:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.media = {"status": "healthy"}

health = HealthResource()
app.add_route("/api/v1/health", health)


# Add route to serve the Swagger UI

class StaticResource:
    def __init__(self, file_path):
        self.file_path = file_path

    def on_get(self, req, resp):
        resp.content_type = 'text/yaml'
        with open(self.file_path, 'r') as f:
            resp.body = f.read()

swagger_spec = StaticResource('./swagger.yml')
app.add_route('/static/swagger.yml', swagger_spec)

# Set up the Swagger UI middleware
register_swaggerui_app(
    app,
    constants.SWAGGER_CONFIG['SWAGGERUI_URL'],
    constants.SWAGGER_CONFIG['SCHEMA_URL'],
    page_title=constants.SWAGGER_CONFIG['PAGE_TITLE'],
    favicon_url=constants.SWAGGER_CONFIG['FAVICON_URL'],
)
