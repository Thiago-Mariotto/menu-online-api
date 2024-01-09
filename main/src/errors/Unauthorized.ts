import HttpError from './HttpError';

export default class Unauthorized extends HttpError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'Unauthorized';
  }
}
