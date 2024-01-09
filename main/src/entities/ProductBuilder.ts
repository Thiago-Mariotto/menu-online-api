import { Product } from './Product';

export class ProductBuilder {
  private productId?: string;
  private storeId?: string;
  private description?: string;
  private price?: number;
  private promotionPrice?: number;
  private quantity: number = 0;
  private categoryId?: string;

  constructor(private name: string) {}

  static withName(name: string) {
    return new ProductBuilder(name);
  }

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  getProductId() {
    return this.productId;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  getPromotionPrice() {
    return this.promotionPrice;
  }

  getQuantity() {
    return this.quantity;
  }

  getCategoryId() {
    return this.categoryId;
  }

  withPrice(price: number) {
    this.price = price;
    return this;
  }

  withPromotionPrice(promotionPrice: number) {
    this.promotionPrice = promotionPrice;
    return this;
  }

  withQuantity(quantity: number) {
    this.quantity = quantity;
    return this;
  }

  withCategoryId(categoryId: string) {
    this.categoryId = categoryId;
    return this;
  }

  getStoreId(): string | undefined {
    return this.storeId;
  }

  withStoreId(storeId: string) {
    this.storeId = storeId;
    return this;
  }

  build() {
    return new Product(this);
  }
}