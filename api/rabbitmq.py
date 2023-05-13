import json
import logging
import time
import pika


class RabbitMQ():

    def __init__(self, host, username, password, exchange=''):
        self._host = host
        self._exchange = exchange
        self._username = username
        self._password = password

    def start_connection(self):
        self.create_channel()
        self.create_exchange()
        self.create_accelerometer_queue()
        self.create_gyroscope_queue()
        logging.info("Channel created...")

    def create_channel(self):
        credentials = pika.PlainCredentials(username=self._username, password=self._password)
        parameters = pika.ConnectionParameters(self._host, credentials=credentials, heartbeat=60)
        connected = False
        while not connected:
            try:
                self._connection = pika.BlockingConnection(parameters)
                self._channel = self._connection.channel()
                connected = True
            except pika.exceptions.AMQPConnectionError:
                logging.info("Failed to connect to RabbitMQ, retrying in 10 seconds...")
                time.sleep(10)

    def create_exchange(self):
        self._channel.exchange_declare(
            exchange=self._exchange,
            exchange_type='direct',
            passive=False,
            durable=True,
            auto_delete=False
        )

    def create_accelerometer_queue(self):
        self._channel.queue_declare(queue='accelerometer_queue', durable=False)
        self._channel.queue_bind(
            exchange=self._exchange,
            queue='accelerometer_queue',
            routing_key='accelerometer'
        )

    def create_gyroscope_queue(self):
        self._channel.queue_declare(queue='gyroscope_queue', durable=False)
        self._channel.queue_bind(
            exchange=self._exchange,
            queue='gyroscope_queue',
            routing_key='gyroscope'
        )

    def publish(self, message={}):
        """
        :param message: message to be publish in JSON format
        """
        try:
            self.start_connection()
            sensor_type = message['sensor_type']
            queue_name = sensor_type + '_queue'
            self._channel.basic_publish(
                exchange=self._exchange,
                routing_key=sensor_type,
                body=json.dumps(message),
                properties=pika.BasicProperties(content_type='application/json')
            )
            logging.info(f"Published Message to queue {queue_name}: {message}")
        except Exception as e:
            logging.error(f"Failed to publish message: {e}")
        finally:
            if self._connection.is_open:
                self._connection.close()