import os

SECRET = os.environ.get('JWT_SECRET')
REGISTRATION_SECRET = os.environ.get('JWT_REGISTRATION_SECRET')

GMAIL_USER = os.environ.get("GMAIL_USER")
GMAIL_PASS = os.environ.get("GMAIL_PASS")
            
SERVER_IP = os.environ.get("SERVER_IP")

MONGO = {
    'DATABASE': os.environ.get('MONGO_INITDB_DATABASE'),
    'HOST': 'mongodb',
    'PORT': 27017,
    'USERNAME': os.environ.get('MONGO_INITDB_ROOT_USERNAME'),
    'PASSWORD': os.environ.get('MONGO_INITDB_ROOT_PASSWORD')
}

RABBITMQ = {
    'USERNAME': os.environ.get('RABBITMQ_USERNAME'),
    'PASSWORD': os.environ.get('RABBITMQ_PASSWORD'),
    'HOST': os.environ.get('RABBITMQ_HOST'),
    'EXCHANGE': os.environ.get('RABBITMQ_EXCHANGE')
}

INFLUXDB = {
    'HOST': os.environ.get('DOCKER_INFLUXDB_INIT_HOST'),
    'PORT': os.environ.get('DOCKER_INFLUXDB_INIT_PORT'),
    'ADMIN_TOKEN': os.environ.get('DOCKER_INFLUXDB_INIT_ADMIN_TOKEN'),
    'ORG': os.environ.get('DOCKER_INFLUXDB_INIT_ORG'),
    'BUCKET': os.environ.get('DOCKER_INFLUXDB_INIT_BUCKET')
}

# Documentation settings
SWAGGER_CONFIG = {
    'SWAGGERUI_URL': '/swagger',
    'SCHEMA_URL': '/static/swagger.yml',
    'PAGE_TITLE': 'Study Falcon api Swagger Doc',
    'FAVICON_URL': 'https://falconframework.org/favicon-32x32.png'
}


ALLOWED_EXTENSIONS = set(['jpeg','png','jpg'])

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
