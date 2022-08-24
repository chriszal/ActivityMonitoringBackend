import falcon, json

from src.model.study import Study

class StudyResource(object):


    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        studies = Study.objects()
       
        resp.body = studies.to_json()

    def on_post(self, req, resp):

        try:
  
          resp.status = falcon.HTTP_201
          study_data = req.media
         
          #req.media will deserialize json object
          study_obj=Study.objects.create(**study_data)
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
        '''
        :param book_id: book_id received in http path to query book object
        :return:
        '''
        try:
          study_obj= Study.objects.get(id=study_id)
          
          #Query book collection to get a record with id = book_id
          resp.body = study_obj.to_json()
          resp.status = falcon.HTTP_200
        except Exception as e:
          resp.status = falcon.HTTP_404
          resp.body = json.dumps({
            'message': 'Study id does not exist.',
            'status': 404,
            'data': {}
            }) 
        
        