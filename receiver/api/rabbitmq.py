import logging
import json
import pika
from api.services.data_processor import DataProcessor
# import subprocess

class RabbitMQReceiver():
    """
    Consumer component that will receive messages and handle
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
        self._routing_key = 'raw.smartwatch.physical_activity.*'  
        self.queue_name = ''
        self._host = host
        self._exchange = exchange
        self._username = username
        self._password = password
        self.data_processor = DataProcessor(influx_host, influx_port, influx_token, influx_org, influx_bucket)
        self.start_server()

    def start_server(self):
        self.create_channel()
        self.create_exchange()
        self.create_bind()
        logging.info("Receiver Channel created...")

    def create_channel(self):
        credentials = pika.PlainCredentials(username=self._username, password=self._password)
        parameters = pika.ConnectionParameters(self._host, credentials=credentials ,heartbeat=0)
        self._connection = pika.BlockingConnection(parameters)
        self._channel = self._connection.channel()

    def create_exchange(self):
        self._channel.exchange_declare(
            exchange=self._exchange,
            exchange_type='topic',  # using topic exchange type
            passive=False,
            durable=True,
            auto_delete=False
        )

    def create_bind(self):
        queue_result = self._channel.queue_declare('', exclusive=True)
        self.queue_name = queue_result.method.queue
        logging.info(f"Queue created: {self.queue_name}")
        self._channel.queue_bind(
            exchange=self._exchange,
            queue=self.queue_name,
            routing_key=self._routing_key
        )


    
    def callback(self, channel, method, properties, body):
        try:
            message = json.loads(body.decode())
            logging.info(f'Received message: {message}')

            sensor_type = message.get('type')
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
            logging.info("Starting the receiver...")
            logging.info(f"Consuming from queue: {self.queue_name}")
            self._channel.basic_consume(
                queue=self.queue_name,
                on_message_callback=self.callback,  
                auto_ack=False
            )
            self._channel.start_consuming()
        except Exception as e:
            logging.debug(f'Exception: {e}')