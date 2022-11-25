import falcon, json

from src.model.user import User
from src.services.participant_service import ParticipantService

class ParticipantResource(object):


    def __init__(self):
        self.participant_service = ParticipantService()


    def on_get_id(self,req,resp,participant_id):

        try:

          participant_objs= self.participant_service.get_participant(participant_id)
          
          resp.body = participant_objs.to_json()
          resp.status = falcon.HTTP_200
        except Exception as e:
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
        
    def on_delete_id(self, req, resp,participant_id):
      try:
        self.participant_service.delete_participant(participant_id)
        resp.status = falcon.HTTP_200
        resp.body = json.dumps({
          'message': 'Participant succesfully deleted!',
          'status': 200,
          'body':{}
        })
      except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Participant id does not exist.',
            'status': 404,
            'data': {}
            }) 

    def on_put_id(self, req, resp,participant_id):
      if req.context.userid == participant_id:
        try:
          participant_data = req.media
          participant_data["participant_id"]=participant_id
          #req.media will deserialize json object
          participant_obj= self.participant_service.update_participant(**participant_data)
          # if participant_obj ==-1:

          resp.status = falcon.HTTP_200
          resp.body = json.dumps({
            'message': 'Participant succesfully updated!',
            'status': 200,
            'body': participant_obj
          })
        except Exception as e:
            resp.status = falcon.HTTP_404
            resp.body = json.dumps({
              'message': 'Participant id does not exist.',
              'status': 404,
              'data': str(e)
              }) 
      else:
        resp.status = falcon.HTTP_409
        resp.body = json.dumps({
          'message': 'Authentication Failure',
          'status': 409,
          'data': {}
          }) 