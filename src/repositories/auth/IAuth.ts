import { TCreationPayloadDTO } from '../../types/Login';

interface IAuth {
  generateToken(payload: TCreationPayloadDTO): string;
  validateToken(token: string): TCreationPayloadDTO;
}

export default IAuth;