import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import ErrorHandlerMiddleware from './middlewares/ErrorHandler.middleware';
import router from './routes';

dotenv.config();
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use('/api', router);

app.use(ErrorHandlerMiddleware.handle);

export default app;
