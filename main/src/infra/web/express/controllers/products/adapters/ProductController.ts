import { NextFunction, Request, Response } from 'express';
import { IService } from '../../../../../../services/IService';
import { TCreationProductDTO, TProductCreated } from '../../../../../../types/Product';

export default class ProductController {

  constructor(
    private _createProductService: IService<TCreationProductDTO, TProductCreated>,
    private _fetchProductsService: IService<null, TProductCreated[]>,
    private _fetchProductByIdService: IService<string, TProductCreated | null>
  ) { }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as TCreationProductDTO;
      const { storeId } = req.params;
      // validar regras de negócio para existência de loja e etc
      const product = await this._createProductService.execute({ ...data, storeId});
      return res.status(201).json({ productId: product.productId, message: 'Product created successfully' });
    } catch (err) {
      next(err);
    }
  }

  async listProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this._fetchProductsService.execute();
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async findProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const product = await this._fetchProductByIdService.execute(productId);
      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}