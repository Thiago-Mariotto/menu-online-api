from confluent_kafka import Producer
from ..config.vars import ENV
import socket

conf = {
    'bootstrap.servers': ENV['kafka'] or 'localhost:9092',
    'client.id': socket.gethostname()
}

msg_sender = Producer(conf)