import { Product } from '../../entities/Product';
import { TProductCreated } from '../../types/Product';

export interface IProductRepository {
  save(product: Product): Promise<TProductCreated>;
  getAll(): Promise<TProductCreated[] | []>;
  getById(productId: string): Promise<TProductCreated | null>;
  setProductQuantity(productId: string, quantity: number): Promise<void>
}