import User from '../../entities/User';
import UserBuilder from '../../entities/UserBuilder';
import Conflict from '../../errors/Conflict';
import IHash from '../../repositories/hash/IHash';
import UserRepository from '../../repositories/user/UserRepository';
import { TCreationUserDTO, TUserCreated } from '../../types/User';
import { IService } from '../IService';

export default class RegisterUserService implements IService<TCreationUserDTO, TUserCreated>{
  private _userRepository: UserRepository;
  private _hashRepository: IHash;

  constructor(userRepository: UserRepository, hashRepository: IHash) {
    this._userRepository = userRepository;
    this._hashRepository = hashRepository;
  }

  public async execute(data: TCreationUserDTO) {
    const user = new UserBuilder(data.cpf)
      .setName(data.name)
      .setEmail(data.email)
      .setPassword(data.password)
      .setPhone(data.phone)
      .build();
    const hashedPassword = this._hashRepository.generateHash(user.password.value);
    user.password = hashedPassword;
    await this.validateUser(user);
    return await this._userRepository.save(user);
  }

  private async validateUser(user: User) {
    if (await this._userRepository.getByCPF(user.cpf.value)) {
      throw new Conflict('CPF already registered');
    }

    if (await this._userRepository.getByEmail(user.email.value)) {
      throw new Conflict('Email already registered');
    }
  }
}