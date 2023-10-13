import Category from '../../entities/Category';
import CategoryRepository from '../../entities/repositories/CategoryRepository';
import { TCreatedCategory, TCreationCategoryDTO } from '../../types/Category';
import { IService } from '../IService';

export default class CreateCategoryService implements IService<TCreationCategoryDTO, TCreatedCategory> {
  private _categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this._categoryRepository = categoryRepository;
  }

  public async execute(categoryDTO: TCreationCategoryDTO) {
    const category = new Category(categoryDTO.name);
    const createdCategory = this._categoryRepository.save(category);
    return createdCategory;
  }
}