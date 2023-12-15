import NotFound from '../../errors/NotFound';
import { IProductRepository } from '../../repositories/product/IProductRepository';
import { TProductCreated } from '../../types/Product';
import { IService } from '../IService';

export default class FetchProductByIdService implements IService<string, TProductCreated> {
  private _productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this._productRepository = productRepository;
  }

  public async execute(productId: string) {
    const product = await this._productRepository.getById(productId);
    if (!product) {
      throw new NotFound(`Product with id ${productId} not found`);
    }
    return product;
  }
}