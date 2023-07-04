import pandas as pd
from api.model.processed_steps import ProcessedSteps
import requests
import logging
import os
from scipy.signal import find_peaks
from scipy.signal import savgol_filter 


class DataProcessor:
    def __init__(self, influx_host, influx_port, influx_token, influx_org, influx_bucket):
        self._influx_host = influx_host
        self._influx_port = influx_port
        self._influx_token = influx_token
        self._influx_org = influx_org
        self._influx_bucket = influx_bucket

    def process_steps(self, message, channel, method):
        chunk_id = message.get('chunk_id')
        response = self.fetch_data(chunk_id)

        if response.status_code == 200:
            if response.headers.get('Content-Encoding', '') == 'gzip':
                try:
                    with open(f'{chunk_id}.csv', 'wb') as f:
                        f.write(response.content)

                    if os.stat(f'{chunk_id}.csv').st_size == 0:
                        logging.info(f'File {chunk_id}.csv is empty.')
                    else:
                        df = pd.read_csv(f'{chunk_id}.csv')
                        df = df.pivot(
                            index='_time', columns='_field', values='_value')
                        logging.info(df.head())
                        # Now i can access 'x', 'y', and 'z' as columns directly
                        x_values = df['x']
                        y_values = df['y']
                        z_values = df['z']

                        # calculate magnitude of accelerometer vector
                        magnitude = (x_values**2 + y_values**2 + z_values**2)**0.5

                        # smoothing the magnitude with a Savitzky-Golay filter
                        # adjusted window_length and polyorder (these values may still need tuning)
                        magnitude_smooth = savgol_filter(magnitude, window_length=101, polyorder=2)

                        # detect peaks which will be considered as steps. 1g is considered as a threshold
                        # added prominence and distance parameters to find_peaks (these values may still need tuning)
                        peaks, _ = find_peaks(magnitude_smooth, height=1, prominence=0.5, distance=50)

                        step_count = len(peaks)
                        logging.info(step_count)
                        # Convert the '_time' index to datetime
                        df.index = pd.to_datetime(df.index, errors='coerce')

                        # Get the start and end dates
                        start_date = df.index.min()
                        end_date = df.index.max()

                        processed_steps = ProcessedSteps(
                            chunk_id=chunk_id, start_date=start_date, end_date=end_date, steps_count=step_count) # Added steps_count
                        processed_steps.save()
                except Exception as e: 
                    logging.error(f'Failed to process data for chunk_id: {e}')
            else:
                logging.info(f'The chunk_id: {chunk_id}, was not found in InfluxDB.')
        else:
            logging.error('Failed to fetch data from InfluxDB')
        channel.basic_ack(delivery_tag=method.delivery_tag)

    def process_bites(self,message, channel, method):
        sensor_type = message.get('type')
        chunk_id = message.get('chunk_id')
        # Replace 'a' with 'g' and vice versa in the chunk_id
        other_type = 'a' if sensor_type == 'g' else 'g'
        other_chunk_id = other_type + chunk_id[1:]

        # Fetch data for the corresponding other chunk_id
        other_data_response = self.fetch_data(other_chunk_id)
        
        if other_data_response.status_code == 200 and other_data_response.headers.get('Content-Encoding', '') == 'gzip':
            logging.info(f'Found corresponding <<{other_type}>> type of data for {chunk_id}. Proceed to process bites.')
            # process the bite
        else:
            logging.info(f'Corresponding <<{other_type}>> type of data for {chunk_id} was not found. Waiting for the data to arrive.')
        channel.basic_ack(delivery_tag=method.delivery_tag)
    



    def fetch_data(self, chunk_id):
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
        return response