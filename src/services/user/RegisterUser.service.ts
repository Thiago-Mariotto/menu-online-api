import { UserModel } from '@prisma/client';
import User from '../../entities/User';
import UserBuilder from '../../entities/UserBuilder';
import { UserRegisterDTO } from '../../types/User';
import { IService } from '../IService';
import UserDataService from './UserData.service';

export default class RegisterUserService implements IService<UserRegisterDTO, UserModel>{

  public async execute(data: UserRegisterDTO) {
    const user = new UserBuilder(data.cpf)
      .setName(data.name)
      .setEmail(data.email)
      .setPassword(data.password)
      .setPhone(data.phone)
      .build();
    await this.validateUser(user);
    return await UserDataService.saveUser(user);
  }

  private async validateUser(user: User) {
    if (await UserDataService.getUserByCPF(user.cpf.value)) {
      throw new Error('CPF já cadastrado');
    }

    if (await UserDataService.getUserByEmail(user.email.value)) {
      throw new Error('Email já cadastrado');
    }
  }
}