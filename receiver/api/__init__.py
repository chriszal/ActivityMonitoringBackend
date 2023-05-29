import logging
import mongoengine as mongo
from api.enum import EnvironmentVariables
from api.rabbitmq import RabbitMQReceiver
import threading

def main():
    logging.basicConfig(
        format='%(asctime)s %(message)s',
        datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO
    )

    mongo.connect(
        EnvironmentVariables.MONGO_INITDB_DATABASE.get_env(),
        host="mongodb",
        port=27017,
        username=EnvironmentVariables.MONGO_INITDB_ROOT_USERNAME.get_env(),
        password=EnvironmentVariables.MONGO_INITDB_ROOT_PASSWORD.get_env()
    )

    receiver_bites = RabbitMQReceiver(
        host=EnvironmentVariables.RABBITMQ_HOST.get_env(),
        username=EnvironmentVariables.RABBITMQ_USERNAME.get_env(),
        password=EnvironmentVariables.RABBITMQ_PASSWORD.get_env(),
        exchange=EnvironmentVariables.RABBITMQ_EXCHANGE.get_env(),
        routing_keys=['smartwatch.accelerometer', 'smartwatch.gyroscope'] ,
        queue="bites_queue",
        influx_host=EnvironmentVariables.DOCKER_INFLUXDB_INIT_HOST.get_env(),
        influx_port=EnvironmentVariables.DOCKER_INFLUXDB_INIT_PORT.get_env(),
        influx_token=EnvironmentVariables.DOCKER_INFLUXDB_INIT_ADMIN_TOKEN.get_env(),
        influx_org=EnvironmentVariables.DOCKER_INFLUXDB_INIT_ORG.get_env(),
        influx_bucket=EnvironmentVariables.DOCKER_INFLUXDB_INIT_BUCKET.get_env(),
    )

    receiver_steps = RabbitMQReceiver(
        host=EnvironmentVariables.RABBITMQ_HOST.get_env(),
        username=EnvironmentVariables.RABBITMQ_USERNAME.get_env(),
        password=EnvironmentVariables.RABBITMQ_PASSWORD.get_env(),
        exchange=EnvironmentVariables.RABBITMQ_EXCHANGE.get_env(),
        routing_keys=['*.accelerometer'] ,
        queue="steps_queue",
        influx_host=EnvironmentVariables.DOCKER_INFLUXDB_INIT_HOST.get_env(),
        influx_port=EnvironmentVariables.DOCKER_INFLUXDB_INIT_PORT.get_env(),
        influx_token=EnvironmentVariables.DOCKER_INFLUXDB_INIT_ADMIN_TOKEN.get_env(),
        influx_org=EnvironmentVariables.DOCKER_INFLUXDB_INIT_ORG.get_env(),
        influx_bucket=EnvironmentVariables.DOCKER_INFLUXDB_INIT_BUCKET.get_env(),
        
    
    )
    thread1 = threading.Thread(target=receiver_bites.get_messages)
    thread2 = threading.Thread(target=receiver_steps.get_messages)

    thread1.start()
    thread2.start()

    thread1.join()
    thread2.join()


    

