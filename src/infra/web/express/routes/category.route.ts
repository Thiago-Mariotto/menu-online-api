import { NextFunction, Request, Response, Router } from 'express';

import CategoryController from '../controllers/category/adapters/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  categoryController.registerCategory(req, res, next));

categoryRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  categoryController.listCategories(req, res, next));

categoryRouter.get('/:categoryId', (req: Request, res: Response, next: NextFunction) =>
  categoryController.findCategory(req, res, next));

export default categoryRouter;