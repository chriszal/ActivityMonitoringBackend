import falcon
import json
import jwt
from datetime import datetime, timedelta
from common.constants import SECRET
from services.register_participant_service import RegisterParticipantService


class RegisterParticipantResource(object):

    def __init__(self):
        self.reg_service = RegisterParticipantService()

    def on_get_reg_code(self, req, resp, reg_code):
        participant_objs = self.reg_service.register_participant(reg_code)

        if participant_objs == 0:
            resp.status = falcon.HTTP_409
            resp.body = json.dumps({
                'message': 'Register code already in use',
                'status': 409,
                'data': {}
            })

        elif participant_objs == -1:
            resp.body = json.dumps({
                'message': 'Register code doesnt exist',
                'status': 404,
                'data': {}
            })
            resp.status = falcon.HTTP_404
        else:
            payload = {
                "id": participant_objs.get('participant_id'),
                "roles":["participant"],
                "exp": datetime.utcnow() + timedelta(days=365),
                "iat":datetime.utcnow()
            }
            secret = SECRET
            algo = "HS256"
            token = jwt.encode(payload=payload, key=secret, algorithm=algo)
            participant_objs['token'] = token.decode("utf-8")
            # print(part_json)
            resp.body = json.dumps(participant_objs)
            resp.status = falcon.HTTP_200
