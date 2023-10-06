import { PrismaClient } from '@prisma/client';
import { Categories } from '../../types/Category';
import { IService } from '../IService';

export default class FetchAllCategoriesService implements IService<never, Categories> {
  private _prisma = new PrismaClient();

  public async execute() {
    const categories = await this._prisma.categoryModel.findMany();
    return categories;
  }
}