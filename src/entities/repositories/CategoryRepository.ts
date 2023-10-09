import {
  TCreatedCategory
} from '../../types/Category';
import Category from '../Category';

interface CategoryRepository {
  getAll(): Promise<TCreatedCategory[] | []>;
  getById(id: string): Promise<TCreatedCategory | null>;
  getByName(name: string): Promise<TCreatedCategory | null>;
  save(category: Category): Promise<TCreatedCategory>;
}

export default CategoryRepository;