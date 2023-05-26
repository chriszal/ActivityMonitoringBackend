import json
import logging
import time
import pika
import queue
import socket

class RabbitMQ():
    def __init__(self, host, username, password, exchange=''):
        self._host = host
        self._connection = None
        self._exchange = exchange
        self._username = username
        self._password = password
        self._local_queue = queue.Queue()

    def start_connection(self):
        try:
            if not self._connection or not self._connection.is_open:
                self.create_channel()
                self.create_exchange()
                logging.info("Channel created...")
        except (pika.exceptions.AMQPConnectionError, socket.gaierror) as e:
            logging.info("Failed to connect to RabbitMQ.")
            # raise e


    def create_channel(self):
        credentials = pika.PlainCredentials(username=self._username, password=self._password)
        parameters = pika.ConnectionParameters(self._host, credentials=credentials, heartbeat=60)
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

    def create_message(self,filename):
        try:
            type, source = filename.split('_')[0:2]
            message = {"type": type,"source": source, "chunk_id": filename}
            routing_key_dict = {
                    's.a': 'smartwatch.accelerometer',
                    's.g': 'smartwatch.gyroscope',
                    's.e': 'smartwatch.eda',
                    's.s': 'smartwatch.steps',
                    's.st': 'smartwatch.stress',
                    'm.a': 'mobile.accelerometer',
                    'm.g': 'mobile.gyroscope'
                }
            routing_key = routing_key_dict[f'{source}.{type}']
            self.publish(routing_key=routing_key, message=message)
        except KeyError:
            logging.error(f"The combination of {source} and {type} does not exist in routing_key_dict")
        except Exception as e:
            logging.error(f"Failed to create message: {e}")


    def publish(self, routing_key, message={}):
        try:
            self.start_connection()
            while not self._local_queue.empty():
                local_message, local_routing_key = self._local_queue.get()
                self._basic_publish(local_message, local_routing_key)
            self._basic_publish(message, routing_key)
        except (pika.exceptions.AMQPConnectionError, socket.gaierror):
            logging.error("Failed to connect to RabbitMQ, adding message to local queue...")
            self._local_queue.put((message, routing_key))
        except Exception as e:
            logging.error(f"Failed to publish message: {e}")
        finally:
            if self._connection and self._connection.is_open:
                self._connection.close()

    def _basic_publish(self, message, routing_key):
        self._channel.basic_publish(
            exchange=self._exchange,
            routing_key=routing_key,
            body=json.dumps(message),
            properties=pika.BasicProperties(delivery_mode = pika.spec.PERSISTENT_DELIVERY_MODE, 
                                            content_type='application/json')
        )
        logging.info(f"Published Message with routing key {routing_key}: {message}")
