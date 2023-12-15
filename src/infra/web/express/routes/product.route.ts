import { NextFunction, Request, Response, Router } from 'express';
import { ProductMemoryRepository } from '../../../../repositories/product/adapter/ProductMemoryRepository';
import CreateProductService from '../../../../services/product/CreateProduct.service';
import FetchAllProductsService from '../../../../services/product/FetchAllProducts.service';
import FetchProductByIdService from '../../../../services/product/FetchProductById.service';
import ProductController from '../controllers/products/adapters/ProductController';
import ProductPrismaRepository from '../../../../repositories/product/adapter/ProductPrismaRepository';

const NODE_ENV = process.env.NODE_ENV || 'development';
const productRepository = NODE_ENV === 'test' ?
  new ProductMemoryRepository(): new ProductPrismaRepository();
const createProductService = new CreateProductService(productRepository);
const fetchAllProductsService = new FetchAllProductsService(productRepository);
const fetchProductByIdService = new FetchProductByIdService(productRepository);

const productRouter = Router();
const productController = new ProductController(
  createProductService,
  fetchAllProductsService,
  fetchProductByIdService
);

productRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  productController.createProduct(req, res, next));

productRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  productController.listProducts(req, res, next));

productRouter.get('/:productId', (req: Request, res: Response, next: NextFunction) =>
  productController.findProduct(req, res, next));

export default productRouter;