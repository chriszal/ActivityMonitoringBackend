import falcon
import jwt
from src.model.user import User
from src.model.participant import Participant
from src.common.constants import SECRET


class AuthHandler:
    def __init__(
        self,
        context_attr1: str = "roles",
        context_attr2: str = "userid",
    ):
        self.context_attr1 = context_attr1
        self.context_attr2 = context_attr2
        self.roles=None
        self.userid=None

    def process_request(self, req, resp):
        
        if "/login" in req.path:
            return

        if "/api/register" in req.path:
            return
        
        
        if req.get_header("Authorization"):
            auth_header = req.get_header("Authorization").split(" ")
            token = auth_header[1]
            if token:
                if not self._is_token_valid(token):
                    description = "The provided auth token is not valid.Please request a new token and try again."
                    raise falcon.HTTPUnauthorized("Unauthorized", description)
                else:
                    setattr(req.context, self.context_attr1, self.roles)
                    setattr(req.context, self.context_attr2, self.userid)
        else:
            description = "The provided auth token is not valid.Please request a new token and try again."
            raise falcon.HTTPUnauthorized("Unauthorized", description)

    def _is_token_valid(self, token):
        try:
            payload = jwt.decode(jwt=token, key=SECRET, algorithms="HS256")
            roles = payload["roles"]
            userid = payload["id"]
            self.userid = userid
            self.roles = roles
            person_count=0
            if "participant" in roles:
                person_count = Participant.objects(participant_id=userid).count()
            else:
                person_count = User.objects(username=userid).count()
                
            if person_count ==1:
                return True
            else:
                return False
            
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return False
