import jwt from 'jsonwebtoken';
import { TCreatedPayload, TCreationPayloadDTO } from '../../../types/Login';
import IAuth from '../IAuth';

export default class JWT implements IAuth {
  constructor(private _SECRET_AUTH: string) { }

  public generateToken(payload: TCreationPayloadDTO): string {
    const tokenConfig: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
      encoding: 'utf8'
    };

    const token = jwt.sign(payload, this._SECRET_AUTH, tokenConfig);
    return token;
  }

  public validateToken(token: string): TCreatedPayload {
    const payload = jwt.verify(token, this._SECRET_AUTH) as TCreatedPayload;
    return payload;
  }
}