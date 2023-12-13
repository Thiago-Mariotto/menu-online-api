import express, { NextFunction, Request, Response } from 'express';
import HttpError from '../../../errors/HttpError';
import router from './routes';

const app = express();


app.use(express.json());
app.use('/api', router);

app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      name: err.name,
      message: err.message
    });
  }

  return res.status(500).json({
    name: 'InternalServerError',
    message: 'Internal Server Error'
  });
});

export default app;
