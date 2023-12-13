import Category from '../../entities/Category';
import Conflict from '../../errors/Conflict';
import CategoryRepository from '../../repositories/category/ICategoryRepository';
import { TCreatedCategory, TCreationCategoryDTO } from '../../types/Category';
import { IService } from '../IService';

export default class CreateCategoryService implements IService<TCreationCategoryDTO, TCreatedCategory> {
  private _categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this._categoryRepository = categoryRepository;
  }

  public async execute(categoryDTO: TCreationCategoryDTO) {
    const category = new Category(categoryDTO.name);
    const categoryAlreadyExists = await this._categoryRepository.getByName(category.name.value);
    if (categoryAlreadyExists) throw new Conflict('Category already exists');
    const createdCategory = await this._categoryRepository.save(category);
    return createdCategory;
  }
}