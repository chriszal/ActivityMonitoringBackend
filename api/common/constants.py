import os
# Documentation settings
SWAGGERUI_URL = '/swagger'
SCHEMA_URL = 'http://petstore.swagger.io/v2/swagger.json'
PAGE_TITLE = 'Study Falcon api Swagger Doc'
FAVICON_URL = 'https://falconframework.org/favicon-32x32.png'

SECRET = os.environ.get('JWT_SECRET')
assert SECRET is not None, "No JWT Secret key found."

REGISTRATION_SECRET = os.environ.get('JWT_REGISTRATION_SECRET')
assert REGISTRATION_SECRET is not None, "No JWT REGISTRATION Secret key found."


ALLOWED_EXTENSIONS = set(['jpeg','png','jpg'])

# datasource constant
MONGO = {
    'DATABASE': os.environ.get('MONGO_INITDB_DATABASE'),
    'HOST': 'mongodb',
    'PORT': 27017,
    'USERNAME': os.environ.get('MONGO_INITDB_ROOT_USERNAME'),
    'PASSWORD': os.environ.get('MONGO_INITDB_ROOT_USERNAME')
}
print(os.environ.get('MONGO_INITDB_ROOT_USERNAME'))

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
