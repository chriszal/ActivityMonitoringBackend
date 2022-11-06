import falcon
import json
import jwt
from datetime import datetime, timedelta
from src.common.constants import SECRET

from src.services.user_service import UserService


class LoginResource:
    def __init__(self):
        self.user_service = UserService()

    def login(self, req, resp):
        req_params = json.loads(req.bounded_stream.read().decode())
        # print("Attempting Login")

        if not req_params or not req_params["Username"] or not req_params["Password"]:
            raise falcon.HTTPBadRequest(
                "Bad Request", "Please enter valid Username and Password")
        else:
            # print("authenticating with username: {} and password: {}".format(
            #     req_params["Username"], req_params["Password"]))
            self._authenticate(
                req_params["Username"], req_params["Password"], req, resp)

    def _authenticate(self, username, password, req, resp):
        if not username or not password:
            raise falcon.HTTPBadRequest(
                "Bad Request", "Please enter valid Username and Password")
        else:
            # print("Fetching User Form DB")
            users = self.user_service.get_user(username, password)
            # print("User Info: {}".format(users))
            if users is not None:
                payload = {
                    "id": users.username,
                    "roles": users.roles
                    # ,
                    # "exp": str(datetime.utcnow() + timedelta(days=31)),
                    # "iat":datetime.utcnow()
                }
                secret = SECRET
                algo = "HS256"
                token = jwt.encode(payload=payload, key=secret, algorithm=algo)
                print(token)
                resp.media = {
                    "token": token.decode("utf-8")
                }
                resp.status = falcon.HTTP_200
            else:
                raise falcon.HTTPUnauthorized(
                    "Unauthorized", "Invalid Credentials")

    def on_post(self, req, resp):
        self.login(req, resp)
