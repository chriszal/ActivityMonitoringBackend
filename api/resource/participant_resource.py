import falcon, json

from api.model.user import User
from api.services.participant_service import ParticipantService
from api.model.participant import Participant

class ParticipantResource(object):


    def __init__(self):
        self.participant_service = ParticipantService()

    def on_get(self, req, resp):
        try:
            participant_objs = self.participant_service.list_all_participants()
            resp.body = participant_objs.to_json()
            resp.status = falcon.HTTP_200
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.body = json.dumps({
                'message': 'Failed to fetch participants.',
                'status': 500,
                'data': {}
            })
            
    def on_get_id(self, req, resp, participant_id):
        try:
            participant_obj = self.participant_service.get_participant(participant_id)
            resp.body = participant_obj.to_json()
            resp.status = falcon.HTTP_200
        except Participant.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Participant does not exist.',
                'status': 404,
                'data': {}
            })

    def on_get_study(self,req,resp,study_id):

        try:
          participant_objs= self.participant_service.list_participants_in_study(study_id)
          if not participant_objs:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
              'message': 'Study does not exist.',
              'status': 404,
              'data': {}
              }) 
          else:

            resp.body = participant_objs.to_json()
            resp.status = falcon.HTTP_200
        except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Participant does not exist.',
            'status': 404,
            'data': {}
            }) 
        
    def on_delete_id(self, req, resp, participant_id):
        try:
            self.participant_service.delete_participant(participant_id)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps({
                'message': 'Participant successfully deleted!',
                'status': 200,
                'body': {}
            })
        except Participant.DoesNotExist:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
                'message': 'Participant ID does not exist.',
                'status': 404,
                'data': {}
            })

    def on_put_id(self, req, resp, participant_id):
        if req.context.userid == participant_id:
            try:
                participant_data = req.media
                participant_data["participant_id"] = participant_id
                participant_obj = self.participant_service.update_participant(**participant_data)
                resp.status = falcon.HTTP_200
                resp.body = json.dumps({
                    'message': 'Participant successfully updated!',
                    'status': 200,
                    'body': participant_obj
                })
            except Participant.DoesNotExist:
                resp.status = falcon.HTTP_404
                resp.body = json.dumps({
                    'message': 'Participant ID does not exist.',
                    'status': 404,
                    'data': {}
                })
        else:
            resp.status = falcon.HTTP_409
            resp.body = json.dumps({
                'message': 'Authentication Failure',
                'status': 409,
                'data': {}
            })
    # def on_post(self, req, resp, study):
      
    #     try:
    #         data = req.media 
    #         participants = self.participant_service.create_participants(study, data["num_participants"])
    #         resp.media = {
    #             'success': True,
    #             'participants': list(participants)
    #         }
    #     except Exception as e:
    #         resp.status = falcon.HTTP_400
    #         resp.media = {
    #             'success': False,
    #             'data': str(e)
    #         }
