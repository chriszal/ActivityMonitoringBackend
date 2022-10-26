from http import client
import falcon, json
import requests
from decouple import config
class MeasurementResource(object):


    def __init__(self):
        self.url = config('INFLUXDB_URL')
        self.token= config('INFLUXDB_TOKEN')
        self.org = config('INFLUXDB_ORG')
        self.bucket=config('INFLUXDB_BUCKET')
        
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):

        try:
            
            input_file = req.get_param('file')
            response = requests.post(url=self.url+"/api/v2/write?org="+self.org+"&bucket="+self.bucket+"&precision=ms",data=input_file.file,headers={'Content-Encoding':'gzip','Authorization':'Token '+self.token})
            

            resp.body = json.dumps({
                'message': str(response)+str(" | Time elapsed: ")+str(response.elapsed.total_seconds()),
                'status': 201,
                'data': {}
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

    
        
        