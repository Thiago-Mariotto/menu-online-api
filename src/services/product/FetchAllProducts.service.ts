import { IProductRepository } from '../../repositories/product/IProductRepository';
import { TProductCreated } from '../../types/Product';
import { IService } from '../IService';

export default class FetchAllProductsService implements IService<null, TProductCreated[]> {
  private _productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this._productRepository = productRepository;
  }

  public async execute() {
    return this._productRepository.getAll();
  }
}