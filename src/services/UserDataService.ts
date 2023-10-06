import { PrismaClient, UserModel } from '@prisma/client';
import User from '../entities/User';

export default class UserDataService {
  private static _prisma = new PrismaClient();

  constructor() { }

  public static async getUserById(userId: string): Promise<UserModel | null> {
    return this._prisma.userModel.findUnique({ where: { userId } });
  }

  public static async getUserByEmail(email: string): Promise<UserModel | null> {
    return this._prisma.userModel.findUnique({ where: { email } });
  }

  public static async getUserByCnpj(cnpj: string): Promise<UserModel | null> {
    return this._prisma.userModel.findUnique({ where: { cnpj } });
  }

  public static async saveUser(user: User): Promise<UserModel> {
    console.log('salvando user', user.name.value);
    return await this._prisma.userModel.create({
      data: {
        cnpj: user.cnpj.value,
        name: user.name.value,
        email: user.email.value,
        password: user.password.value,
        role: user.role,
        phone: user.phone,
        active: user.active,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  }
}