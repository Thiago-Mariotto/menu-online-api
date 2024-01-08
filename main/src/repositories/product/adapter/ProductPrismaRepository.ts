import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Product } from '../../../entities/Product';
import { TProductCreated } from '../../../types/Product';
import ConnectionPrismaAdapter from '../../connection/adapters/ConnectionPrismaAdapter';
import { IProductRepository } from '../IProductRepository';

export default class ProductPrismaRepository implements IProductRepository {
  private _prisma: PrismaClient;
  private _productModel: Prisma.ProductModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new ConnectionPrismaAdapter().getConnection();
    this._productModel = this._prisma.productModel;
  }

  async setProductQuantity(productId: string, quantity: number): Promise<void> {
    await this._productModel.update({
      where: { productId },
      data: { quantity }
    });
  }

  public async getAll(): Promise<TProductCreated[]> {
    return this._productModel.findMany();
  }

  public async getById(productId: string): Promise<TProductCreated | null> {
    return this._productModel.findUnique({ where: { productId } });
  }

  public async save(product: Product) {
    return this._prisma.productModel.create({
      data: {
        name: product.name,
        description: product.description!,
        price: product.price!,
        promotionPrice: product.promotionPrice!,
        quantity: product.quantity,
        categoryId: product.categoryId!,
        storeId: product.storeId!,
      }
    });
  }
}