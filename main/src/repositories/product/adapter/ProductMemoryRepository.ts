import { Product } from '../../../entities/Product';
import { TProductCreated } from '../../../types/Product';
import { IProductRepository } from '../IProductRepository';

export class ProductMemoryRepository implements IProductRepository {

  setProductQuantity(productId: string, quantity: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private products: TProductCreated[] = [];

  async save(product: Product): Promise<TProductCreated> {
    const newProduct: TProductCreated = {
      productId: 'uuid-productId',
      name: product.name,
      description: product.description!,
      price: product.price!,
      promotionPrice: product.promotionPrice!,
      quantity: product.quantity,
      categoryId: 'uuid-category',
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async getAll(): Promise<TProductCreated[] | []> {
    return this.products;
  }

  async getById(productId: string): Promise<TProductCreated | null> {
    return this.products.find((product) => product.productId === productId) ?? null;
  }

}