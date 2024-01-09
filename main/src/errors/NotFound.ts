import HttpError from './HttpError';

export default class NotFound extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFound';
  }
}