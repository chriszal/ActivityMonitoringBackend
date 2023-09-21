import pandas as pd
from api.model.processed_steps import ProcessedSteps
import requests
import numpy as np
import logging
import os
from scipy.signal import find_peaks
from scipy.signal import savgol_filter 
from datetime import datetime


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
                        df = df.pivot(index='_time', columns='_field', values='_value')
                        logging.info(df.head())
                        df.index = pd.to_datetime(df.index, format='ISO8601', errors='raise')


                        # Calculate the magnitude using the Colab code's method
                        df['magnitude'] = (df['x']**2 + df['y']**2 + df['z']**2)**0.5

                        # Smooth the magnitude using the adjusted parameters
                        df['magnitude_smooth'] = savgol_filter(df['magnitude'], window_length=91, polyorder=2)

                        # Detect peaks with the adjusted parameters
                        initial_peaks, _ = find_peaks(df['magnitude_smooth'], height=0.9, prominence=0.4)

                        # Time-based peak filtering with the adjusted min_time_interval
                        min_time_interval = 0.15
                        peaks = [initial_peaks[0]]
                        for i in range(1, len(initial_peaks)):
                            if (df.index[initial_peaks[i]] - df.index[peaks[-1]]).total_seconds() > min_time_interval:
                                peaks.append(initial_peaks[i])
                        peaks = np.array(peaks)

                        step_count = len(peaks)
                        logging.info(f"Number of steps: {step_count}")


                        # Get the start and end dates
                        start_date = df.index.min()
                        end_date = df.index.max()

                        participant_id, year, month, day, hour = self.extract_info_from_chunk_id(chunk_id)

                        week = datetime(year, month, day).isocalendar()[1]  # Extract week number from date

                        processed_steps = ProcessedSteps(
                            participant_id=participant_id,
                            chunk_id=chunk_id,
                            start_date=start_date,
                            end_date=end_date,
                            steps_count=step_count,
                            year=year,
                            month=month,
                            day=day,
                            hour=hour,
                            week=week
                        )
                        logging.info(processed_steps.to_dict())
                        processed_steps.save()

                except Exception as e:
                    logging.error(f'Failed to process data for chunk_id: {e}')
            else:
                logging.info(f'The chunk_id: {chunk_id}, was not found in InfluxDB.')
        else:
            logging.error('Failed to fetch data from InfluxDB')
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

    def extract_info_from_chunk_id(self, chunk_id):
        parts = chunk_id.split('-')
        participant_id = parts[2]
        date_str = parts[3]
        year = int(date_str[0:4])
        month = int(date_str[4:6])
        day = int(date_str[6:8])
        hour = int(parts[4]) // 6  # Assuming each chunk represents a 10-minute interval
        return participant_id, year, month, day, hour

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