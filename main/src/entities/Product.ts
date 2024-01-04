import { ProductBuilder } from './ProductBuilder';

export class Product { 

  private _productId?: string;
  private _name: string;
  private _storeId?: string;
  private _description?: string;
  private _price?: number;
  private _promotionPrice?: number;
  private _quantity: number = 0;
  private _categoryId?: string;
  private _imageId?: string;
  

  constructor(
    productBuilder: ProductBuilder
  ) { 
    this._productId = productBuilder.getProductId();
    this._name = productBuilder.getName();
    this._description = productBuilder.getDescription();
    this._price = productBuilder.getPrice();
    this._promotionPrice = productBuilder.getPromotionPrice();
    this._quantity = productBuilder.getQuantity();
    this._categoryId = productBuilder.getCategoryId();
    this._storeId = productBuilder.getStoreId();
  }
  
  get productId(): string | undefined {
    return this._productId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get price(): number | undefined {
    return this._price;
  }

  get promotionPrice(): number | undefined {
    return this._promotionPrice;
  }

  get quantity(): number {
    return this._quantity;
  }

  get categoryId(): string | undefined {
    return this._categoryId;
  }

  get storeId(): string | undefined {
    return this._storeId;
  }
}