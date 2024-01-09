from confluent_kafka import Consumer
from confluent_kafka.error import KafkaError, KafkaException
from ..config.vars import ENV
from ..db.register_order import register_order
import sys, json

conf = {'bootstrap.servers': ENV['kafka_host'],
        'group.id': 't',
        'auto.offset.reset': 'smallest'}

def create_consumer(conf, topics: list[str]):
  consumer = Consumer(conf)
  consumer.subscribe(topics)
  return consumer

def msg_process(msg):
   order = json.loads(msg.value())
   print(order, 'mensagem recebida!')
   register_order(order)
   
def consume():
  try:
    consumer = create_consumer(conf, ['newOrder'])

    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None: continue

        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                sys.stderr.write('%% %s [%d] reached end at offset %d\n' %
                                  (msg.topic(), msg.partition(), msg.offset()))
            elif msg.error():
                raise KafkaException(msg.error(), "caiu na kafka exception")
        else:
            msg_process(msg)
  finally:
    consumer.close()


