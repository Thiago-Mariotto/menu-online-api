import { NextFunction, Request, Response } from 'express';
import CategoryController from '../../../../src/infra/web/express/controllers/category/adapters/CategoryController';
import CategoryMemoryRepository from '../../../../src/repositories/category/adapters/CategoryMemoryRepository';
import CreateCategoryService from '../../../../src/services/categories/CreateCategory.service';
import { createdCategory } from '../../../mocks/category.mock';
describe('# Unit - Controller => CategoryController', function () {
  let categoryController: CategoryController;
  let createCategoryService: CreateCategoryService;
  let categoryMemoryRepository: CategoryMemoryRepository;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    categoryMemoryRepository = new CategoryMemoryRepository();
    createCategoryService = new CreateCategoryService(categoryMemoryRepository);
    categoryController = new CategoryController();
    req = {} as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as NextFunction;
  });

  test('should return status 201 and message "Category created successfully" when category is created', async function () {
    createCategoryService.execute = jest.fn().mockResolvedValueOnce(createdCategory);

    req.body = { name: 'Test Category' };

    await categoryController.registerCategory(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Category created successfully' });
  });
});