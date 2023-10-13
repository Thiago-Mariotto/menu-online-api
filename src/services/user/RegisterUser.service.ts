import User from '../../entities/User';
import UserBuilder from '../../entities/UserBuilder';
import UserRepository from '../../entities/repositories/UserRepository';
import Conflict from '../../errors/Conflict';
import UserMemoryRepository from '../../repositories/user/UserMemoryRepository';
import { TCreationUserDTO, TUserCreated } from '../../types/User';
import { IService } from '../IService';

export default class RegisterUserService implements IService<TCreationUserDTO, TUserCreated>{
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async execute(data: TCreationUserDTO) {
    const user = new UserBuilder(data.cpf)
      .setName(data.name)
      .setEmail(data.email)
      .setPassword(data.password)
      .setPhone(data.phone)
      .build();
    await this.validateUser(user);
    return await this._userRepository.save(user);
  }

  private async validateUser(user: User) {
    if (await this._userRepository.getByCPF(user.cpf.value)) {
      throw new Conflict('CPF already registered');
    }

    if (await this._userRepository.getByEmail(user.email.value)) {
      throw new Conflict('CPF already registered');
    }
  }
}

const newUser: TCreationUserDTO = {
  cpf: '43545679896',
  name: 'John Doe',
  email: 'joh@mail.com',
  password: '1234Abcd##',
  phone: '12992187230'
};

const userRepository = new UserMemoryRepository();
const registerUserService = new RegisterUserService(userRepository);
registerUserService.execute(newUser);

