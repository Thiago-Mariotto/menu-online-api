import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import CategoryRepository from '../../entities/repositories/CategoryRepository';
import { TCategoryCreated, TCreationCategoryDTO } from '../../types/Category';

export default class CategoryPrismaRepository implements CategoryRepository {
  private _prisma: PrismaClient;
  private _categoryModel: Prisma.CategoryModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new PrismaClient();
    this._categoryModel = this._prisma.categoryModel;
  }

  getAll(): Promise<TCategoryCreated[] | []> {
    return this._categoryModel.findMany();
  }

  getById(id: string): Promise<TCategoryCreated | null> {
    return this._categoryModel.findUnique({ where: { categoryId: id } }) || null;
  }

  getByName(name: string): Promise<TCategoryCreated | null> {
    return this._categoryModel.findFirst({ where: { name } }) || null;
  }

  save(category: TCreationCategoryDTO): Promise<TCategoryCreated> {
    return this._categoryModel.create({ data: { name: category.name } });
  }

}
