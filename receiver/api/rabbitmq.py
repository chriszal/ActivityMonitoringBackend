import logging
import os
import gzip
import json
import requests
import pika
import time
import shutil
from api.services.data_processor import DataProcessor
# import subprocess

class rabbitMQServer():
    """
    Producer component that will publish message and handle
    connection and channel interactions with RabbitMQ.
    """

    def __init__(
        self,
        host,
        username,
        password,
        exchange='',
        influx_host='',
        influx_port='',
        influx_token='',
        influx_org='',
        influx_bucket=''
    ):
        self._queues = ['accelerometer_queue', 'gyroscope_queue']
        self._host = host
        self._exchange = exchange
        self._username = username
        self._password = password
        self.data_processor = DataProcessor(influx_host, influx_port, influx_token, influx_org, influx_bucket)
        self.start_server()

    def start_server(self):
        self.create_channel()
        self.create_exchange()
        for queue in self._queues:
            self.create_bind(queue)
        logging.info("Channel created...")

    def create_channel(self):
        credentials = pika.PlainCredentials(username=self._username, password=self._password)
        parameters = pika.ConnectionParameters(self._host, credentials=credentials ,heartbeat=0)
        self._connection = pika.BlockingConnection(parameters)
        self._channel = self._connection.channel()

    def create_exchange(self):
        self._channel.exchange_declare(
            exchange=self._exchange,
            exchange_type='direct',
            passive=False,
            durable=True,
            auto_delete=False
        )

    def create_bind(self, queue):
        self._channel.queue_declare(queue=queue, durable=False)
        self._channel.queue_bind(
            queue=queue,
            exchange=self._exchange,
            routing_key=queue.replace('_queue', '')  # extract routing key from queue name
        )
        self._channel.basic_qos(prefetch_count=1)
  

    
    def callback(self, channel, method, properties, body):
        try:
            message = json.loads(body.decode())
            logging.info(f'Received message: {message}')

            sensor_type = message.get('sensor_type')
            chunk_id = message.get('chunk_id')

            if sensor_type == 'accelerometer':
                self.data_processor.process_accelerometer(chunk_id,channel,method)
            elif sensor_type == 'gyroscope':
                self.process_gyroscope(chunk_id)
            
            
        except Exception as e:
            logging.error(f'Error while processing message: {e}')



    def process_gyroscope(self, chunk_id):
        # Process the response here
        return
   

    def get_messages(self):
        try:
            logging.info("Starting the server...")
            for queue in self._queues:
                self._channel.basic_consume(
                    queue=queue,
                    on_message_callback=self.callback,  
                    auto_ack=False
                )
            self._channel.start_consuming()
        except Exception as e:
            logging.debug(f'Exception: {e}')