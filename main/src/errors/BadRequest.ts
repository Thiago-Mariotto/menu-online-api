import HttpError from './HttpError';

export default class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'BadRequest';
  }
}