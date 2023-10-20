import { NextFunction, Request, Response } from 'express';
import ICategoryRepository from '../../../../../../repositories/category/ICategoryRepository';
import CategoryMemoryRepository from '../../../../../../repositories/category/adapters/CategoryMemoryRepository';
import CreateCategoryService from '../../../../../../services/categories/CreateCategory.service';
import { TCreationCategoryDTO } from '../../../../../../types/Category';

export default class CategoryController {
  private _categoryRepository: ICategoryRepository;
  private _createCategoryService: CreateCategoryService;

  constructor() {
    this._categoryRepository = new CategoryMemoryRepository();
    this._createCategoryService = new CreateCategoryService(this._categoryRepository);
  }

  async registerCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryData = req.body as TCreationCategoryDTO;
      await this._createCategoryService.execute(categoryData);
      return res.status(201).json({ message: 'Category created successfully' });
    } catch (err) {
      next(err);
    }
  }

  async listCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this._categoryRepository.getAll();
      return res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async findCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const category = await this._categoryRepository.getById(categoryId);
      return res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
}