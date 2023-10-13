import CategoryRepository from '../../entities/repositories/CategoryRepository';
import { TCreatedCategory } from '../../types/Category';
import { IService } from '../IService';

export default class FetchAllCategoriesService implements IService<never, TCreatedCategory[]> {
  private _categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this._categoryRepository = categoryRepository;
  }

  public async execute() {
    const categories = await this._categoryRepository.getAll();
    return categories;
  }
}