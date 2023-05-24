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
            exchange_type='topic', 
            passive=False,
            durable=True,
            auto_delete=False
        )

    def publish(self, message={}):
        """ :param message: message to be publish in JSON format """
        try:
            self.start_connection()
            type = message['type']
            source = message['source']  
            routing_key = f'raw.{source}.physical_activity.steps' 

            self._channel.basic_publish(
                exchange=self._exchange,
                routing_key=routing_key,
                body=json.dumps(message),
                properties=pika.BasicProperties(content_type='application/json')
            )
            logging.info(f"Published Message with routing key {routing_key}: {message}")
        except Exception as e:
            logging.error(f"Failed to publish message: {e}")
        finally:
            if self._connection.is_open:
                self._connection.close()
