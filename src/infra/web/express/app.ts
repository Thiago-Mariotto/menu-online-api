import cors from 'cors';
import express from 'express';
import ErrorHandlerMiddleware from './middlewares/ErrorHandler.middleware';
import router from './routes';
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use('/api', router);

app.use(ErrorHandlerMiddleware.handle);

export default app;
