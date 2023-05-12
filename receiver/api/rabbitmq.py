import logging

import pika
import requests
import time
# import subprocess

class rabbitMQServer():
    """
    Producer component that will publish message and handle
    connection and channel interactions with RabbitMQ.
    """

    def __init__(self, queue, host, routing_key, username, password, exchange=''):
        self._queue = queue
        self._host = host
        self._routing_key = routing_key
        self._exchange = exchange
        self._username = username
        self._password = password
        self.start_server()

    def start_server(self):
        self.create_channel()
        self.create_exchange()
        self.create_bind()
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
        self._channel.queue_declare(queue=self._queue, durable=False)

    def create_bind(self):
        self._channel.queue_bind(
            queue=self._queue,
            exchange=self._exchange,
            routing_key=self._routing_key
        )
        self._channel.basic_qos(prefetch_count=1)

    @staticmethod
    def callback(channel, method, properties, body):
        tag = body.decode()
        # logging.info(tag['data'])
        logging.info(f'Received message with tag {tag} from queue')
        time.sleep(15) # Sleep for 5 seconds
        # To-DO get data from json split it to get file name and then call the query bellow. 
        channel.basic_ack(delivery_tag=method.delivery_tag)
        # query = f'from(bucket:"android") |> range(start:-1000000h) |> filter(fn: (r) => r._measurement == "accel" and r.chunk_id == "{tag}")'
        # response = requests.post(
        #     'http://0.0.0.0:8086/api/v2/query?org=hua',
        #     headers={
        #         'Authorization': 'Token i0mYX0UAjXvsFK_m1v2wvw8D_qmKW_bCYRo0g3e_ame4Y9Co02Nd7dPV_VvptwaUyhtafGOHjkUlQfOJMLlrNw==',
        #         'Accept': 'application/csv',
        #         'Accept-Encoding': 'gzip',
        #         'Content-type': 'application/vnd.flux'
        #     },
        #     data=query
        # )
        # if response.status_code == 200:
        #     logging.info('Received response from InfluxDB')
        #     # process the response as desired
        # else:
        #     logging.error('Failed to fetch data from InfluxDB')

    def process_response(self, response):
        # Process the response here
        print(response)

    def get_messages(self):
        try:
            logging.info("Starting the server...")
            self._channel.basic_consume(
                queue=self._queue,
                on_message_callback=rabbitMQServer.callback,
                auto_ack=False
            )
            self._channel.start_consuming()
        except Exception as e:
            logging.debug(f'Exception: {e}')