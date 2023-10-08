import { UserModel } from '@prisma/client';
import User from '../../entities/User';
import UserBuilder from '../../entities/UserBuilder';
import Conflict from '../../errors/Conflict';
import { TUserRegisterDTO } from '../../types/User';
import { IService } from '../IService';
import UserDataService from './UserData.service';

export default class RegisterUserService implements IService<TUserRegisterDTO, UserModel>{

  public async execute(data: TUserRegisterDTO) {
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
      throw new Conflict('CPF already registered');
    }

    if (await UserDataService.getUserByEmail(user.email.value)) {
      throw new Conflict('CPF already registered');
    }
  }
}