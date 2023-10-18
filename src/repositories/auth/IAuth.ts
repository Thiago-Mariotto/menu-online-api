import { TCreatedPayload, TCreationPayloadDTO } from '../../types/Login';

interface IAuth {
  generateToken(payload: TCreationPayloadDTO): string;
  validateToken(token: string): TCreatedPayload;
}

export default IAuth;