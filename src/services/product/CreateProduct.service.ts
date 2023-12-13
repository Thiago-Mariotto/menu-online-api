import { ProductBuilder } from '../../entities/ProductBuilder';
import { IProductRepository } from '../../repositories/product/IProductRepository';
import { TCreationProductDTO, TProductCreated } from '../../types/Product';
import { IService } from '../IService';

export default class CreateProductService implements IService<TCreationProductDTO, TProductCreated>{
  private _productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this._productRepository = productRepository;
  }

  public async execute(data: TCreationProductDTO) {
    const product = ProductBuilder.withName(data.name)
      .withCategoryId(data.categoryId)
      .withDescription(data.description)
      .withPrice(data.price)
      .withPromotionPrice(data.promotionPrice)
      .withQuantity(data.quantity)
      .build();
    return this._productRepository.save(product);
  }
}