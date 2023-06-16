import requests
import falcon, json
from os.path import splitext

class MeasurementResource(object):

    def __init__(self, rabbitmq, INFLUXDB, logging):
        self.host = INFLUXDB['HOST']
        self.port = INFLUXDB['PORT']
        self.token = INFLUXDB['ADMIN_TOKEN']
        self.org = INFLUXDB['ORG']
        self.bucket = INFLUXDB['BUCKET']
        self.rabbitmq = rabbitmq
        self.logging = logging
        
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

    def process_file(self, filename, file):
        try:
            with requests.Session() as session:
                response = session.post(
                    url=f"http://{self.host}:{self.port}/api/v2/write?org={self.org}&bucket={self.bucket}&precision=ms", 
                    data=file, 
                    headers={'Content-Encoding':'gzip','Authorization':f'Token {self.token}'}
                )
                self.logging.info(response.status_code)
                if response.status_code == 204:
                    return {'status': 200, 'message': 'Data successfully written to InfluxDB'}
                else:
                    return {'status': 500, 'message': 'Failed to write data to InfluxDB'}
        except Exception as e:
            self.logging.error(f"Error processing file {filename}: {str(e)}")
            return {'status': 500, 'message': f"Error processing file {filename}: {str(e)}"}

    def on_post(self, req, resp):
        try:
            input_file = None
            for key in req.params.keys():
                if key.startswith('file'):
                    input_file = req.get_param(key)
                    if input_file is not None:
                        break  # Only get the first file, then exit the loop

            if input_file is not None:
                filename = splitext(input_file.filename)[0]  # remove .gz extension
                result = self.process_file(filename, input_file.file)
                if result['status'] == 200:
                    self.rabbitmq.create_message(filename=filename) 
                    resp.status = falcon.HTTP_200
                    resp.body = json.dumps(result)
                else:
                    resp.status = falcon.HTTP_500
                    resp.body = json.dumps(result)
            else:
                resp.status = falcon.HTTP_400
                resp.body = json.dumps({'status': 400, 'message': 'No file found in request'})
        except Exception as e:
            resp.status = falcon.HTTP_500
            resp.body = json.dumps({'status': 500, 'message': f"An error occurred while processing the request: {str(e)}"})
