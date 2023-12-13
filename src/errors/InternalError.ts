import HttpError from './HttpError';

export default class InternalError extends HttpError {
  constructor(message: string) {
    super(message, 500);
    this.name = 'InternalError';
  }
}