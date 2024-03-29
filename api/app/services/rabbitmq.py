import json
import logging
import time
import pika
import queue
import os

class RabbitMQ():
    
        def __init__(self, host, username, password, exchange=''):
            self._host = host
            self._connection = None
            self._exchange = exchange
            self._username = username
            self._password = password

        def start_connection(self):
            if not self._connection or not self._connection.is_open:
                self.create_channel()
                self.create_exchange()
                logging.info("Channel created...")

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
                type, source = filename.split('-')[0:2]
                message = {"type": type,"source": source, "chunk_id": filename}
                routing_key_dict = {
                        's.acc': 'smartwatch.accelerometer',
                        's.gyr': 'smartwatch.gyroscope',
                        's.ebm': 'smartwatch.eda',
                        's.ste': 'smartwatch.steps',
                        's.str': 'smartwatch.stress',
                        'm.acc': 'mobile.accelerometer',
                        'm.gyr': 'mobile.gyroscope'
                    }
                routing_key = routing_key_dict.get(f'{source}.{type}')
                if routing_key is not None:
                    self.publish(routing_key=routing_key, message=message)
                else:
                    logging.error(f"The combination of {source} and {type} does not exist in routing_key_dict")
            except Exception as e:
                logging.error(f"Failed to create message: {e}")

        def publish(self, routing_key, message={}):
            try:
                self.start_connection()
                self._basic_publish(message, routing_key)
            except (pika.exceptions.AMQPError, OSError):
                logging.error("Failed to connect to RabbitMQ, adding message to local queue...")
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
            self._channel.confirm_delivery()  # Confirm that message has been delivered
            logging.info(f"Published Message with routing key {routing_key}: {message}")
