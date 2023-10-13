import NotFound from '../../errors/NotFound';
import CategoryRepository from '../../repositories/category/ICategoryRepository';
import { TCreatedCategory } from '../../types/Category';
import { IService } from '../IService';

export default class FetchCategoryByIdService implements IService<string, TCreatedCategory> {
  private _categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this._categoryRepository = categoryRepository;
  }

  public async execute(categoryId: string) {
    const category = await this._categoryRepository.getById(categoryId);

    if (!category) {
      throw new NotFound(`Category with id ${categoryId} not found`);
    }

    return category;
  }
}