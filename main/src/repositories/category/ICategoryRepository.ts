import Category from '../../entities/Category';
import {
  TCreatedCategory
} from '../../types/Category';

interface ICategoryRepository {
  getAll(): Promise<TCreatedCategory[] | []>;
  getById(id: string): Promise<TCreatedCategory | null>;
  getByName(name: string): Promise<TCreatedCategory | null>;
  save(category: Category): Promise<TCreatedCategory>;
}

export default ICategoryRepository;