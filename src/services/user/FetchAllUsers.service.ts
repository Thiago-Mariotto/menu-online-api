import { PrismaClient } from '@prisma/client';
import removeFields from '../../utils/excludeObjectField';

export default class FetchAllUsersService {
  private _prisma = new PrismaClient();

  public async execute() {
    const users = await this._prisma.userModel.findMany();
    const usersWithoutPassword = users.map(user => {
      return removeFields(user, ['password']);
    });

    return usersWithoutPassword;
  }
}