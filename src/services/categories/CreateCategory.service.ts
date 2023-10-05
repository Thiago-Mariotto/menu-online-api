import { PrismaClient } from '@prisma/client';
import { IService } from '../IService';
import { CreatedCategoryDTO, CreationCategoryDTO } from '../../types/Category';
import Category from '../../entities/Category';


export default class CreateCategoryService implements IService<CreationCategoryDTO, CreatedCategoryDTO> {
  private _prisma = new PrismaClient();

  public async execute(categoryDTO: CreationCategoryDTO) {
    const category = new Category(categoryDTO.name);
    const createdCategory = this._prisma.category.create({
      data: {
        name: category.name.value,
      }
    });
    return createdCategory;
  }
}