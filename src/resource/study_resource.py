import falcon, json

from src.services.study_service import StudyService

class StudyResource(object):


    def __init__(self):
        self.study_service = StudyService()

    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        studies = self.study_service.list_studies()
       
        resp.body = studies.to_json()

    def on_post(self, req, resp):

        try:
  
          resp.status = falcon.HTTP_201
          study_data = req.media
         
          #req.media will deserialize json object
          study_obj= self.study_service.create_study(**study_data)
          resp.body = json.dumps({
            'message': 'study succesfully created!',
            'status': 201,
            'data': str(study_obj.id)
          })
          return
          
        except Exception as e:
           
            resp.status = falcon.HTTP_400
            resp.body = json.dumps({
            'message': str(e),
            'status': 400,
            'data': {}
           })
            return

    def on_get_id(self,req,resp,study_id):
        try:
          study_obj= self.study_service.get_study(study_id)
          
          resp.body = study_obj.to_json()
          resp.status = falcon.HTTP_200
        except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Study id does not exist.',
            'status': 404,
            'data': {}
            }) 

    def on_delete_id(self, req, resp,study_id):
      try:
        self.study_service.delete_study(study_id)

        resp.body = json.dumps({
          'message': 'Study succesfully deleted!',
          'status': 204,
          'body':{}
        })
      except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Study id does not exist.',
            'status': 404,
            'data': {}
            }) 
        
        