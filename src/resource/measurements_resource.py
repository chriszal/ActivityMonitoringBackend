import falcon, json
from influxdb import InfluxDBClient
import os

class MeasurementResource(object):


    def __init__(self):
        self.client = InfluxDBClient(host='localhost', port=8086, database='android', gzip=True)

    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

    def on_post(self, req, resp):

        try:
            resp.status = falcon.HTTP_201
            meas_data = req.media
            self.client.query('select * from cpu_load_short')       
            resp.body = json.dumps({
                'message': 'study succesfully created!',
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

    
        
        