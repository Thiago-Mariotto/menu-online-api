import EventEmitter from 'events';
import Kafka from 'node-rdkafka';

const pubSubEventManager = new EventEmitter();

let consumer : Kafka.KafkaConsumer;

pubSubEventManager.on('start-consumer', (topics: string[]) => {
  console.log('Iniciando consumer do Kafka');
  consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': process.env['KAFKA_HOST'] || 'localhost:9092',
  }, {});

  consumer.connect();

  consumer
    .on('ready', () => {
      console.log('calling consume');
      consumer.subscribe(topics);
      consumer.consume();
    })
    .on('data', (data): void => {
      if (!data.value) return;
      switch (data.topic) {
        case 'orders':    
            console.log(data.value.toString());
        default:
          return;
      }
    });

});

pubSubEventManager.on('stop-consumer', () => {
  console.log('Parando consumer do Kafka');
  consumer.disconnect();
});

export function stopConsumer() {
  pubSubEventManager.emit('stop-consumer');
  process.exit(0);
}


export default pubSubEventManager;