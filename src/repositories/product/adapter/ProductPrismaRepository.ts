import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { IProductRepository } from '../IProductRepository';
import { TProductCreated } from '../../../types/Product';
import { Product } from '../../../entities/Product';

export default class ProductPrismaRepository implements IProductRepository {
  private _prisma: PrismaClient;
  private _productModel: Prisma.ProductModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new PrismaClient();
    this._productModel = this._prisma.productModel;
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
      }
    });
  }
}