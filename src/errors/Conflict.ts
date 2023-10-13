import HttpError from './HttpError';

export default class Conflict extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}