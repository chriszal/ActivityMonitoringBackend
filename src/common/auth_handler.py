import falcon
import jwt
from src.model.user import User
from src.model.participant import Participant
from src.common.constants import SECRET


class AuthHandler:
    def __init__(
        self,
        context_attr: str = "roles",
    ):
        self.context_attr = context_attr
        self.roles=None

    def process_request(self, req, resp):
        
        if "/login" in req.path:
            return

        if "/api/register" in req.path:
            return
        
        if "/api/user" in req.path:
            return
            
        if req.get_header("Authorization"):
            auth_header = req.get_header("Authorization").split(" ")
            token = auth_header[1]
            if token:
                if not self._is_token_valid(token):
                    description = "The provided auth token is not valid.Please request a new token and try again."
                    raise falcon.HTTPUnauthorized("Unauthorized", description)
                else:
                    setattr(req.context, self.context_attr, self.roles)
        else:
            description = "The provided auth token is not valid.Please request a new token and try again."
            raise falcon.HTTPUnauthorized("Unauthorized", description)

    def _is_token_valid(self, token):
        try:
            payload = jwt.decode(jwt=token, key=SECRET, algorithms="HS256")
            if 'roles' in payload.keys():
                roles = payload["roles"]
                self.roles = roles
                print("Authenticated, Roles : {}".format(roles))
            userid = payload["id"]
            
            # participant = Participant.objects.get(participant_id=userid)
            # user = User.objects.get(username=userid)
            print("Authenticated, User : {}".format(userid))
            
            return True
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return False
