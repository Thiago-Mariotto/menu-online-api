import User from '../../entities/User';
import UserBuilder from '../../entities/UserBuilder';
import { UserRegisterDTO } from '../../types/User';
import AddressService from '../address/AddressService.service';
import UserDataService from './UserData.service';

export default class RegisterUserService {
  private _user: User;

  constructor(data: UserRegisterDTO) {
    this._user = new UserBuilder(data.cnpj)
      .setName(data.name)
      .setEmail(data.email)
      .setPassword(data.password)
      .setPhone(data.phone)
      .setCep(data.cep)
      .setNumber(data.number)
      .setComplement(data.complement)
      .build();
  }

  public async execute() {
    await this.validateUser(this._user);
    const newUser = await UserDataService.saveUser(this._user);
    this._user.id = newUser.userId;
    await AddressService.execute(this._user);
    return;
  }

  private async validateUser(user: User) {
    if (await UserDataService.getUserByCnpj(user.cnpj.value)) {
      throw new Error('CNPJ já cadastrado');
    }

    if (await UserDataService.getUserByEmail(user.email.value)) {
      throw new Error('Email já cadastrado');
    }
  }
}


const newUser: UserRegisterDTO = {
  name: 'Hamburguer do Zé',
  email: 'john2@mail.com',
  cnpj: '33.113.309/0001-47',
  cep: '12414-070',
  complement: 'casa',
  number: '240',
  password: '123Abcde!!',
  phone: '(12) 99212-9876',
};

new RegisterUserService(newUser).execute()
  .then(() => console.log('done'))
  .catch((err) => console.error(err));

