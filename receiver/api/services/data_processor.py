import pandas as pd
from api.model.accel_processed import AccelProcessed
import requests
import logging
import os

class DataProcessor:
    def __init__(self, influx_host, influx_port, influx_token, influx_org, influx_bucket):
        self._influx_host = influx_host
        self._influx_port = influx_port
        self._influx_token = influx_token
        self._influx_org = influx_org
        self._influx_bucket = influx_bucket

    def process_accelerometer(self, chunk_id,channel,method):
        data = f'from(bucket:"{self._influx_bucket}") |> range(start:-1000000h) |> filter(fn: (r) => r.chunk_id == "{chunk_id}")'
        response = requests.post(
            f'http://{self._influx_host}:{self._influx_port}/api/v2/query?org={self._influx_org}',
            headers={
                'Authorization': f'Token {self._influx_token}',
                'Accept': 'application/csv',
                'Accept-Encoding': 'gzip',
                'Content-type': 'application/vnd.flux'
            },
            data=data
        )
        
        if response.status_code == 200:
            if response.headers.get('Content-Encoding', '') == 'gzip':
                try:
                    with open(f'{chunk_id}.csv', 'wb') as f:
                        f.write(response.content)

                    if os.stat(f'{chunk_id}.csv').st_size == 0:
                        logging.info(f'File {chunk_id}.csv is empty.')
                    else:
                        df = pd.read_csv(f'{chunk_id}.csv')
                        df = df.pivot(index='_time', columns='_field', values='_value')
                        logging.info(df.head())
                        # Now i can access 'x', 'y', and 'z' as columns directly
                        x_values = df['x']
                        y_values = df['y']
                        z_values = df['z']

                         # Convert the '_time' index to datetime
                        df.index = pd.to_datetime(df.index, errors='coerce')

                        # Get the start and end dates
                        start_date = df.index.min()
                        end_date = df.index.max()

                        accel_processed = AccelProcessed(chunk_id=chunk_id, start_date=start_date, end_date=end_date)
                        accel_processed.save()
                except Exception as e: 
                    logging.error(f'Failed to process data for chunk_id: {e}')


            else:
               logging.info(f'The chunk_id: {chunk_id}, was not found.')

        else:
            logging.error('Failed to fetch data from InfluxDB')
        channel.basic_ack(delivery_tag=method.delivery_tag)
