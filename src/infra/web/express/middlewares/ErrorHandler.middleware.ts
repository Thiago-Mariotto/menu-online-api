import { NextFunction, Request, Response } from 'express';
import HttpError from '../../../../errors/HttpError';

export default class ErrorHandlerMiddleware {
  static handle(err: HttpError, req: Request, res: Response, _next: NextFunction) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        name: err.name,
        message: err.message
      });
    }

    console.error('Erro capturado no middleware', err);
    return res.status(500).json({
      name: 'InternalServerError',
      message: 'Internal Server Error'
    });
  }
}