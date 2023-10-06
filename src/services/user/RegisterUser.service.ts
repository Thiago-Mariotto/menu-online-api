import User from '../../entities/User';
import UserBuilder from '../../entities/UserBuilder';
import { UserRegisterDTO } from '../../types/User';
import AddressService from '../address/AddressService';
import UserDataService from './UserData.service';

export default class RegisterUserService {
  private _user: User;

  constructor(data: UserRegisterDTO) {
    this._user = new UserBuilder(data.cpf)
      .setName(data.name)
      .setEmail(data.email)
      .setPassword(data.password)
      .setPhone(data.phone)
      .build();
  }

  public async execute() {
    await this.validateUser(this._user);
    const newUser = await UserDataService.saveUser(this._user);
    this._user.id = newUser.userId;
    await AddressService.checkUserAddress(this._user);
    return;
  }

  private async validateUser(user: User): Promise<void> {
    if (await UserDataService.getUserByCPF(user.cpf.value)) {
      throw new Error('CPF já cadastrado');
    }

    if (await UserDataService.getUserByEmail(user.email.value)) {
      throw new Error('Email já cadastrado');
    }
  }
}
