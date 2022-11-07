import falcon
import json
import jwt
from src.common.constants import SECRET
from src.services.register_service import RegisterService


class RegisterResource(object):

    def __init__(self):
        self.reg_service = RegisterService()

    def on_get_reg_code(self, req, resp, reg_code):
        participant_objs = self.reg_service.register_participant(reg_code)

        if participant_objs == 0:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Register code already in use',
                'status': 404,
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
                "roles":["participant"]
            }
            secret = SECRET
            algo = "HS256"
            token = jwt.encode(payload=payload, key=secret, algorithm=algo)
            participant_objs['token'] = token.decode("utf-8")
            # print(part_json)
            resp.body = json.dumps(participant_objs)
            resp.status = falcon.HTTP_200
