import { v4 as uuid } from 'uuid';
import Category from '../../../entities/Category';
import { TCreatedCategory } from '../../../types/Category';
import CategoryRepository from '../ICategoryRepository';

export default class CategoryMemoryRepository implements CategoryRepository {
  private _table: TCreatedCategory[];

  constructor() {
    this._table = [];
  }

  public async getAll(): Promise<TCreatedCategory[] | []> {
    return this._table;
  }

  public async getById(categoryId: string): Promise<TCreatedCategory | null> {
    return this._table.find(category => category.categoryId === categoryId) || null;
  }

  public async getByName(name: string): Promise<TCreatedCategory | null> {
    return this._table.find(category => category.name === name) || null;
  }

  public async save(category: Category): Promise<TCreatedCategory> {
    const categoryId = uuid();
    const newCategory = {
      categoryId,
      name: category.name.value
    };

    this._table.push(newCategory);
    return newCategory;
  }
}