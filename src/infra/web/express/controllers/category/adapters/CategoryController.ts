import { NextFunction, Request, Response } from 'express';
import CreateCategoryService from '../../../../../../services/categories/CreateCategory.service';
import FetchAllCategoriesService from '../../../../../../services/categories/FetchAllCategories.service';
import FetchCategoryByIdService from '../../../../../../services/categories/FetchCategoryById.service';
import { TCreationCategoryDTO } from '../../../../../../types/Category';

export default class CategoryController {

  constructor(
    private readonly _createCategoryService: CreateCategoryService,
    private readonly _fetchAllCategoriesService: FetchAllCategoriesService,
    private readonly _fetchCategoryByIdService: FetchCategoryByIdService
  ) { }

  async registerCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryData = req.body as TCreationCategoryDTO;
      const { categoryId } = await this._createCategoryService.execute(categoryData);
      return res.status(201).json({ categoryId, message: 'Category created successfully' });
    } catch (err) {
      next(err);
    }
  }

  async listCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this._fetchAllCategoriesService.execute();
      return res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async findCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const category = await this._fetchCategoryByIdService.execute(categoryId);
      return res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
}