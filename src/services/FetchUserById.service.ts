import { PrismaClient, UserModel } from '@prisma/client';
import { IService } from './IService';

export default class FetchCategoryByIdService implements IService<string, UserModel> {
  private _prisma = new PrismaClient();

  public async execute(userId: string) {
    const user = await this._prisma.userModel.findFirst({
      where: {
        userId: userId,
      }
    });
    if (!user) {
      throw new Error(`Category with id ${userId} not found`);
    }
    return user;
  }
}