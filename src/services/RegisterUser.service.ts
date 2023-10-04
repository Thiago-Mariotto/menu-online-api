/* eslint-disable max-lines-per-function */
import { AddressModel, PrismaClient } from '@prisma/client';
import User from '../entities/User';
import UserBuilder from '../entities/UserBuilder';
import { UserRegisterDTO } from '../types/User';
import AddressService from './Address.service';

export default class RegisterUserService {
  private _prisma = new PrismaClient();
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
    const userAddressByViaCep = await AddressService.getAddressByViaCep(this._user.cep);
    const newAddress = await AddressService.saveAddress(userAddressByViaCep, this._user);
    await this.saveUser(this._user, newAddress);
  }

  private async saveUser(user: User, address: AddressModel): Promise<void> {
    await this._prisma.userModel.create({
      data: {
        cnpj: user.cnpj.value,
        name: user.name.value,
        email: user.email.value,
        password: user.password.value,
        role: user.role,
        phone: user.phone,
        active: user.active,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        addressId: address.addressId
      }
    });
  }

}
