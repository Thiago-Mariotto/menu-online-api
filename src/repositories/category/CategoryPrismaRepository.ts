import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import Category from '../../entities/Category';
import { TCreatedCategory } from '../../types/Category';
import CategoryRepository from './ICategoryRepository';

export default class CategoryPrismaRepository implements CategoryRepository {
  private _prisma: PrismaClient;
  private _categoryModel: Prisma.CategoryModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new PrismaClient();
    this._categoryModel = this._prisma.categoryModel;
  }

  getAll(): Promise<TCreatedCategory[] | []> {
    return this._categoryModel.findMany();
  }

  getById(id: string): Promise<TCreatedCategory | null> {
    return this._categoryModel.findUnique({ where: { categoryId: id } }) || null;
  }

  getByName(name: string): Promise<TCreatedCategory | null> {
    return this._categoryModel.findFirst({ where: { name } }) || null;
  }

  save(category: Category): Promise<TCreatedCategory> {
    return this._categoryModel.create({ data: { name: category.name.value } });
  }

}
