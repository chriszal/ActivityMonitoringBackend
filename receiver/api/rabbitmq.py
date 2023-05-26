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
        self._routing_keys = ['smartwatch.accelerometer', 'smartwatch.gyroscope'] 
        self.queue_name = 'testing_queue'
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
            exchange_type='topic',  
            passive=False,
            durable=True,
            auto_delete=False
        )

    def create_bind(self):
        self._channel.queue_declare(queue=self.queue_name, exclusive=False, durable=True)
        logging.info(f"Queue created: {self.queue_name}")
        for routing_key in self._routing_keys: 
            self._channel.queue_bind(
                exchange=self._exchange,
                queue=self.queue_name,
                routing_key=routing_key
            )


    
    def callback(self, channel, method, properties, body):
        try:
            message = json.loads(body.decode())
            logging.info(f'Received message: {message}')

            sensor_type = message.get('type')
            chunk_id = message.get('chunk_id')

            if sensor_type in ['a', 'g']:
                self.data_processor.process_bites(sensor_type, chunk_id, channel, method)
            else:
                logging.error(f'Cant proccess <<{sensor_type}>> type of data here. This shouldnt have been routed here!')

        except Exception as e:
            logging.error(f'Error while processing message: {e}')
   

    def get_messages(self):
        try:
            logging.info("Starting the receiver...")
            self._channel.basic_consume(
                queue=self.queue_name,
                on_message_callback=self.callback,  
                auto_ack=False
            )
            self._channel.start_consuming()
        except Exception as e:
            logging.debug(f'Exception: {e}')
