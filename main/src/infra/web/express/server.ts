import pubSubEventManager, { stopConsumer } from '../../pubsub/consumer';
import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  pubSubEventManager.emit('start-consumer', ['orders']);
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => { 
  stopConsumer();
});

process.on('SIGINT', () => { 
  stopConsumer();
});