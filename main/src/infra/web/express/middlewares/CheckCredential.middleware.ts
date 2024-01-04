import { NextFunction, Request, Response } from 'express';
import Unauthorized from '../../../../errors/Unauthorized';
import IAuth from '../../../../repositories/auth/IAuth';
import JWT from '../../../../repositories/auth/adapters/JWT';
import CheckCredentialsService from '../../../../services/authentication/CheckCredentials.service';

export default class CheckCredentialMiddleware {
  constructor(
    private _secretKey = process.env.SECRET_KEY || 'secret',
    private _authRepository: IAuth = new JWT(_secretKey),
    private _checkCredentialsService: CheckCredentialsService = new CheckCredentialsService(_authRepository)
  ) { }

  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        throw new Unauthorized('Token não informado');
      }
      const payload = await this._checkCredentialsService.execute(authorization);
      req.body.user = { ...payload };
      next();
    } catch (error) {
      next(new Unauthorized('Token inválido'));
    }
  }
}