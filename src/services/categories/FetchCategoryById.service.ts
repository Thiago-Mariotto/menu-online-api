import { PrismaClient } from '@prisma/client';
import Category from '../../entities/Category';
import { IService } from '../IService';

export default class FetchCategoryByIdService implements IService<string, Category> {
  private _prisma = new PrismaClient();

  public async execute(categoryId: string) {
    const prismaCategory = await this._prisma.categoryModel.findFirst({
      where: {
        categoryId: categoryId,
      }
    });
    if (!prismaCategory) {
      throw new Error(`Category with id ${categoryId} not found`);
    }
    return new Category(prismaCategory.name);
  }
}