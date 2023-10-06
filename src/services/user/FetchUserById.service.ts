import { PrismaClient } from '@prisma/client';
import removeFields from '../../utils/excludeObjectField';

export default class FetchUserByIdService {
  private _prisma = new PrismaClient();

  public async execute(userId: string) {
    const user = await this._prisma.userModel.findFirst({
      where: {
        userId: userId,
      }
    });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    const userWithoutPassword = removeFields(user, ['password']);
    return userWithoutPassword;
  }
}