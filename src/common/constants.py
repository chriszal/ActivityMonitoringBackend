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
        'administration': ['admin'],
        'create':['admin', 'study_coordinator'],
        'study': ['admin', 'study_coordinator', 'study_assistant'],
        'mobile': ['admin', 'study_coordinator', 'study_assistant', 'participant'],
    },
    'routes': {
        '/api/study/': {
            'POST': ['study'],
        },
        '/api/study/{study_id}': {
            'GET': ['mobile'],
            'DELETE': ['study'],
        },
        '/api/user/': {
            'POST': ['create'],
        },
        '/api/user/{username}': {
            'GET': ['study'],
            'DELETE': ['study'],
        },
        '/api/participant/{participant_id}': {
            'GET': ['mobile'],
            'DELETE': ['study'],
        },
        '/api/participants/{study_id}': {
            'GET': ['study'],
        },
        '/api/measurement/': {
            'POST': ['mobile'],
        },
    },
}
