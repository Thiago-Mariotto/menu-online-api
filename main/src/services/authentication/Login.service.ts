import Forbidden from '../../errors/Forbidden';
import Unauthorized from '../../errors/Unauthorized';
import IAuth from '../../repositories/auth/IAuth';
import IHash from '../../repositories/hash/IHash';
import IUserRepository from '../../repositories/user/UserRepository';
import { TLoginDTO, TToken } from '../../types/Login';
import { TUserCreated } from '../../types/User';
import { IService } from '../IService';

export default class LoginService implements IService<TLoginDTO, TToken> {
  private _userRepository: IUserRepository;
  private _Auth: IAuth;
  private _Hash: IHash;

  constructor(userRepository: IUserRepository, authRepository: IAuth, hashRepository: IHash) {
    this._userRepository = userRepository;
    this._Auth = authRepository;
    this._Hash = hashRepository;
  }

  public async execute(login: TLoginDTO): Promise<TToken> {
    const { email, password } = login;
    const user = await this.userExists(email);
    await this.checkPassword(password, user.password);
    await this.userIsActive(user.active);
    return this.generateToken(user);
  }

  private async userExists(email: string) {
    const user = await this._userRepository.getByEmail(email);
    if (!user) throw new Unauthorized('Email or password invalid');
    return user;
  }

  private async checkPassword(userLoginPassword: string, userStorePassword: string) {
    const isPasswordValid = this._Hash.compareHash(userLoginPassword, userStorePassword);
    if (!isPasswordValid) throw new Unauthorized('Email or password invalid');
  }

  private async userIsActive(active: boolean) {
    if (!active) throw new Forbidden('User inactive');
  }

  private generateToken(user: TUserCreated): TToken {
    const payload = {
      id: user.userId,
      role: user.role,
      name: user.name
    };

    const token = this._Auth.generateToken(payload);
    return { token };
  }
}
