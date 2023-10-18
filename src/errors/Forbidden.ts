import HttpError from './HttpError';

export default class Forbidden extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'Forbidden';
  }
}
