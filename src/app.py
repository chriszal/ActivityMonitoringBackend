import falcon
import pathlib

import src.common.constants as constants
from src.common.cors import Cors
from src.common.json_translator import JSONTranslator
from src.common.require_json import RequireJSON
import mongoengine as mongo
from src.common.handlers import ExceptionHandler as handler

from src.resource.study_resource import StudyResource

mongo.connect(
    constants.MONGO['DATABASE'],
    host=constants.MONGO['HOST'],
    port=constants.MONGO['PORT'],
    username=constants.MONGO['USERNAME'],
    password=constants.MONGO['PASSWORD']
)

STATIC_PATH = pathlib.Path(__file__).parent / 'static'

app = falcon.API(middleware=[Cors()])

study = StudyResource()
app.add_route('/api/study/', study)
app.add_route('/api/study/{study_id}', study, suffix="id")

app.add_static_route('/static', str(STATIC_PATH))

# global handler exception of application
app.add_error_handler(Exception, handler.handle_500)

# handler for not found resources
app.add_sink(handler.handle_404, '^((?!static).)*$')
