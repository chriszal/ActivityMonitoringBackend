import os
# Documentation settings
SWAGGERUI_URL = '/swagger'
SCHEMA_URL = '/static/swagger.json'
PAGE_TITLE = 'Study Falcon api Swagger Doc'
FAVICON_URL = 'https://falconframework.org/favicon-32x32.png'

SECRET = os.environ.get('JWT_SECRET')
assert SECRET is not None, "No JWT Secret key found."

# datasource constant
MONGO = {
    'DATABASE': 'falconapidb',
    'HOST': 'mongodb',
    'PORT': 27017,
    'USERNAME': '',
    'PASSWORD': ''
}

policy_config = {
    'roles': [
        'admin',
        'study_coordinator',
        'study_assistant',
        'participant',
    ],
    'groups': {
        'create': ['admin', 'study_coordinator', 'study_assistant'],
        'update': ['admin', 'study_coordinator', 'study_assistant'],
        'read': ['admin', 'study_coordinator', 'study_assistant', 'participant'],
        'delete': ['admin'],
    },
    'routes': {
        '/api/study/': {
            'POST': ['create'],
        },
        '/api/study/{study_id}': {
            'GET': ['read'],
            'DELETE': ['read'],
        },
        '/api/user/': {
            'POST': ['create'],
        },
        '/api/user/{username}': {
            'GET': ['read'],
            'DELETE': ['read'],
        },
        '/api/participant/{participant_id}': {
            'GET': ['read'],
            'DELETE': ['read'],
        },
        '/api/participants/{study_id}': {
            'GET': ['read'],
        },
        '/api/measurement/': {
            'POST': ['participant'],
        },
        '/login': {
            'HEAD': ['@passthrough']
        }
        # ,
        # '/api/register': {
        #     'HEAD': ['@passthrough']
        # },
    },
}
