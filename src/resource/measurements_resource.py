from http import client
import falcon, json
import requests
from requests.adapters import HTTPAdapter
#from requests.packages.urllib3.util.retry import Retry
from decouple import config
class MeasurementResource(object):


    def __init__(self):
        self.host = config('DOCKER_INFLUXDB_INIT_HOST')
        self.port = config('DOCKER_INFLUXDB_INIT_PORT')
        self.token= config('DOCKER_INFLUXDB_INIT_ADMIN_TOKEN')
        self.org = config('DOCKER_INFLUXDB_INIT_ORG')
        self.bucket=config('DOCKER_INFLUXDB_INIT_BUCKET')
        
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):

        try:
            # retry_strategy = Retry(
            #     total=3,
            #     backoff_factor=1
            # )
            # adapter = HTTPAdapter(max_retries=retry_strategy)
            # http = requests.Session()
            # http.mount("http://",adapter)
            input_file = req.get_param('file')   
            response = requests.post(url="http://"+self.host+":"+self.port+"/api/v2/write?org="+self.org+"&bucket="+self.bucket+"&precision=ms",data=input_file.file,headers={'Content-Encoding':'gzip','Authorization':'Token '+self.token})
            resp.status = falcon.HTTP_204

            resp.body = json.dumps({
                'message': str(response)+str(" | Time elapsed: ")+str(response.elapsed.total_seconds()),
                'status': 204,
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

    
        
        