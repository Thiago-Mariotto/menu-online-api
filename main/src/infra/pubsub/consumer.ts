/* eslint-disable indent */
import EventEmitter from 'events';
import Kafka from 'node-rdkafka';
import ProductPrismaRepository from '../../repositories/product/adapter/ProductPrismaRepository';
import { TProductCreated } from '../../types/Product';

const pubSubEventManager = new EventEmitter();

let consumer: Kafka.KafkaConsumer;

pubSubEventManager.on('start-consumer', (topics: string[]) => {
  console.log('Iniciando consumer do Kafka');
  consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': process.env['KAFKA_HOST'] || 'localhost:9092',
  }, {});

  consumer.connect();

  consumer.on('ready', () => {
    consumer.subscribe(topics);
    consumer.consume();
  })
    .on('data', handleMessage);

});

const handleMessage = async (data: any): Promise<void> => {
  if (!data.value) return;
  switch (data.topic) {
    case 'orders': {
      const parsedData = JSON.parse(data.value.toString());
      await updateProduct(parsedData.products);
      break;
    }
    default:
      return;
  }
};

type ProductDTO = {
  product_id: string;
  quantity: number;
}

const updateProduct = async (products: ProductDTO[]) => {
  const prodPrismaRepo = new ProductPrismaRepository();
  const findedProducts = products.map((product: ProductDTO) => {
    return prodPrismaRepo.getById(product.product_id);
  });

  const productsToUpdate = await Promise.all(findedProducts);

  productsToUpdate.forEach(async (product: TProductCreated | null) => {
    if (!product) return;
    const productInd = products.findIndex((prod) => prod.product_id === product.productId);
    console.log('alterando produto', product.productId);
    const newQuantity = product.quantity - products[productInd].quantity;
    await prodPrismaRepo.setProductQuantity(product.productId, newQuantity);
  });

};

pubSubEventManager.on('stop-consumer', () => {
  console.log('Parando consumer do Kafka');
  consumer.disconnect();
});

export function stopConsumer() {
  pubSubEventManager.emit('stop-consumer');
  process.exit(0);
}


export default pubSubEventManager;