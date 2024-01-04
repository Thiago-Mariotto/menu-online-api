import IAuth from '../../repositories/auth/IAuth';
import { TCreatedPayload } from '../../types/Login';
import { IService } from '../IService';

export default class CheckCredentialsService implements IService<string, TCreatedPayload> {
  private _AuthRepository: IAuth;

  constructor(authRepository: IAuth) {
    this._AuthRepository = authRepository;
  }

  async execute(token: string): Promise<TCreatedPayload> {
    return this._AuthRepository.validateToken(token);
  }
}