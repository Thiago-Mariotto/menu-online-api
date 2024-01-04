import { PrismaClient } from '@prisma/client';

export default class CreateProductService {
  private _prisma = new PrismaClient();

  public async execute(categoryDTO: CreationProductDTO) {
    // const category = new Product(categoryDTO.name);
    // const createdCategory = this._prisma.product.create({
    //   data: {
        
    //   }
    // });
    // return createdCategory;
  }
}