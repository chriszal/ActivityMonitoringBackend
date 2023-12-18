import falcon
from keycloak import KeycloakOpenID
from common.constants import KEYCLOAK_CONFIG

class KeycloakAuthMiddleware(object):
    def process_request(self, req, resp):
        token = req.get_header('Authorization')
        if not token:
            raise falcon.HTTPUnauthorized('Authorization token required')

        keycloak_openid = KeycloakOpenID(server_url=KEYCLOAK_CONFIG['server_url'],
                                         client_id=KEYCLOAK_CONFIG['client_id'],
                                         realm_name=KEYCLOAK_CONFIG['realm_name'],
                                         client_secret_key=KEYCLOAK_CONFIG['client_secret'])

        try:
            keycloak_openid.introspect(token)
        except Exception as e:
            raise falcon.HTTPUnauthorized('Invalid token')
