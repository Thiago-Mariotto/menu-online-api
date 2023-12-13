import { NextFunction, Request, Response, Router } from 'express';

import CategoryMemoryRepository from '../../../../repositories/category/adapters/CategoryMemoryRepository';
import CategoryPrismaRepository from '../../../../repositories/category/adapters/CategoryPrismaRepository';
import CreateCategoryService from '../../../../services/categories/CreateCategory.service';
import FetchAllCategoriesService from '../../../../services/categories/FetchAllCategories.service';
import FetchCategoryByIdService from '../../../../services/categories/FetchCategoryById.service';
import CategoryController from '../controllers/category/adapters/CategoryController';

const NODE_ENV = process.env.NODE_ENV || 'development';
const categoryRepository = NODE_ENV === 'test' ?
  new CategoryMemoryRepository() : new CategoryPrismaRepository();
const createCategoryService = new CreateCategoryService(categoryRepository);
const fetchAllCategoriesService = new FetchAllCategoriesService(categoryRepository);
const fetchCategoryByIdService = new FetchCategoryByIdService(categoryRepository);

const categoryRouter = Router();
const categoryController = new CategoryController(createCategoryService, fetchAllCategoriesService, fetchCategoryByIdService);

categoryRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  categoryController.registerCategory(req, res, next));

categoryRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  categoryController.listCategories(req, res, next));

categoryRouter.get('/:categoryId', (req: Request, res: Response, next: NextFunction) =>
  categoryController.findCategory(req, res, next));

export default categoryRouter;