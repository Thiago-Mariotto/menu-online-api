import { PrismaClient } from '@prisma/client';
import Category from '../../entities/Category';
import { CreatedCategoryDTO, CreationCategoryDTO } from '../../types/Category';
import { IService } from '../IService';


export default class CreateCategoryService implements IService<CreationCategoryDTO, CreatedCategoryDTO> {
  private _prisma = new PrismaClient();

  public async execute(categoryDTO: CreationCategoryDTO) {
    const category = new Category(categoryDTO.name);
    const createdCategory = this._prisma.categoryModel.create({
      data: {
        name: category.name.value,
      }
    });
    return createdCategory;
  }
}