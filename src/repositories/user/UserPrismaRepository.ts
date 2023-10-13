import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import User from '../../entities/User';
import { TUserCreated } from '../../types/User';
import UserRepository from './UserRepository';

export default class UserPrismaRepository implements UserRepository {
  private _prisma: PrismaClient;
  private _userModel: Prisma.UserModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new PrismaClient();
    this._userModel = this._prisma.userModel;
  }

  public async getAll(): Promise<TUserCreated[] | []> {
    return this._userModel.findMany();
  }

  public async getById(userId: string): Promise<TUserCreated | null> {
    return this._userModel.findUnique({ where: { userId } });
  }

  public async getByEmail(email: string): Promise<TUserCreated | null> {
    return this._userModel.findUnique({ where: { email } });
  }

  public async getByCPF(cpf: string): Promise<TUserCreated | null> {
    return this._userModel.findUnique({ where: { cpf } });
  }

  public async save(user: User): Promise<TUserCreated> {
    return await this._prisma.userModel.create({
      data: {
        cpf: user.cpf.value,
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