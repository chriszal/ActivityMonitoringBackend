import falcon, json

from src.model.user import User
from src.services.participant_service import ParticipantService

class ParticipantResource(object):


    def __init__(self):
        self.participant_service = ParticipantService()


    def on_get_participant(self,req,resp,id,study_id):

        try:

          participant_objs= self.participant_service.get_participant_in_study(id,study_id)
          
          resp.body = participant_objs.to_json()
          resp.status = falcon.HTTP_200
        except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Participant does not exist.',
            'status': 404,
            'data': {}
            }) 

    def on_get_studyid(self,req,resp,study_id):

        try:

          participant_objs= self.participant_service.list_participants_in_study(study_id)
          
          resp.body = participant_objs.to_json()
          resp.status = falcon.HTTP_200
        except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Participant does not exist.',
            'status': 404,
            'data': {}
            }) 

    def on_update_participant(self,req,resp,id,study_id):

        try:

          participant_objs= self.participant_service.modify_participant(id,study_id)
          
          resp.body = participant_objs.to_json()
          resp.status = falcon.HTTP_200
        except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Participant does not exist.',
            'status': 404,
            'data': {}
            }) 
        
    def on_delete_participant(self, req, resp,id,study_id):
      try:
        self.participant_service.delete_participant(id,study_id)

        resp.body = json.dumps({
          'message': 'Participant succesfully deleted!',
          'status': 204,
          'body':{}
        })
      except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Participant id does not exist.',
            'status': 404,
            'data': {}
            }) 