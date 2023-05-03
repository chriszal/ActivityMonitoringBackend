import os
import json
# Documentation settings
SWAGGERUI_URL = '/swagger'
SCHEMA_URL = 'http://petstore.swagger.io/v2/swagger.json'
PAGE_TITLE = 'Study Falcon api Swagger Doc'
FAVICON_URL = 'https://falconframework.org/favicon-32x32.png'

SECRET ="secret"
assert SECRET is not None, "No JWT Secret key found."

REGISTRATION_SECRET = "secret"
assert REGISTRATION_SECRET is not None, "No JWT REGISTRATION Secret key found."


f = open('/var/mongo_credentials.json')
data = json.load(f)
mongo_db_user = data.get("user")
mongo_db_password = data.get("password")
mongo_db = data.get("databases")
for db in mongo_db:
    mongo_db_name = db.get("name")


ALLOWED_EXTENSIONS = set(['jpeg','png','jpg'])

# datasource constant
MONGO = {
    'DATABASE': mongo_db_name,
    'HOST': 'mongodb',
    'PORT': 27017,
    'USERNAME': mongo_db_user,
    'PASSWORD': mongo_db_password
}
# print(os.environ.get('MONGO_INITDB_ROOT_USERNAME'))

policy_config = {
    'roles': [
        'admin',
        'member',
        'participant',
    ],
    'groups': {
        'administration': ['admin'],
        'create':['admin', 'study_coordinator'],
        'study': ['admin', 'study_coordinator', 'study_assistant'],
        'mobile': ['admin', 'study_coordinator', 'study_assistant', 'participant'],
    },
    'routes': {
        '/api/v1/studies': {
            'POST': ['create'],
            'GET':['administration'],
        },
        '/api/v1/study/{study_id}': {
            'GET': ['mobile'],
            'PUT': ['study'],
            'DELETE': ['study'],
        },
        '/api/v1/users': {
            'POST': ['create'],
            'GET':['administration'],
        },
        '/api/v1/users/{email}': {
            'GET': ['study'],
            'PUT': ['study'],
            'DELETE': ['study'],
        },
        '/api/v1/participant/{participant_id}': {
            'GET': ['mobile'],
            'PUT': ['mobile'],
            'DELETE': ['study'],
        },
        '/api/v1/participants/study/{study_id}': {
            'GET': ['study'],
        },
        '/api/v1/measurement/': {
            'POST': ['mobile'],
        },
        '/api/v1/meal/': {
            'POST': ['mobile'],
            'DELETE': ['mobile'],
        },
        '/api/v1/meals/participant/{participant_id}': {
            'GET': ['mobile'],
            'DELETE': ['mobile'],
        },
    },
}
