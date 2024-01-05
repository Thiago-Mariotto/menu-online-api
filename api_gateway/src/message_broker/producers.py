from confluent_kafka import Producer
import socket

def delivery_report(err, msg):
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

conf = {
    'bootstrap.servers': 'localhost:9092',
    'client.id': socket.gethostname()
}

producer = Producer(conf)

# Envia a mensagem e especifica o callback de entrega
producer.produce('orders', "value".encode('utf-8'), callback=delivery_report)

# Aguarda até que todas as mensagens sejam enviadas
producer.flush()