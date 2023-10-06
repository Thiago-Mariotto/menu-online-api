import { PrismaClient } from '@prisma/client';
import { IService } from '../IService';
import Category from '../../entities/Category';

export default class FetchCategoryByIdService implements IService<string, Category> {
  private _prisma = new PrismaClient();
  
  public async execute(categoryId: string) {
    const prismaCategory = await this._prisma.category.findFirst({
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