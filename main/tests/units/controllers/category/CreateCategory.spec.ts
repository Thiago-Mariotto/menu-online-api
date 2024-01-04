import { NextFunction, Request, Response } from 'express';
import BadRequest from '../../../../src/errors/BadRequest';
import Conflict from '../../../../src/errors/Conflict';
import CategoryController from '../../../../src/infra/web/express/controllers/category/adapters/CategoryController';
import CategoryMemoryRepository from '../../../../src/repositories/category/adapters/CategoryMemoryRepository';
import CreateCategoryService from '../../../../src/services/categories/CreateCategory.service';
import FetchAllCategoriesService from '../../../../src/services/categories/FetchAllCategories.service';
import FetchCategoryByIdService from '../../../../src/services/categories/FetchCategoryById.service';

describe('# Unit - Controller => CategoryController', function () {
  let categoryController: CategoryController;
  let categoryMemoryRepository: CategoryMemoryRepository;
  let createCategoryService: CreateCategoryService;
  let fetchAllCategoriesService: FetchAllCategoriesService;
  let fetchCategoryByIdService: FetchCategoryByIdService;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    categoryMemoryRepository = new CategoryMemoryRepository();
    createCategoryService = new CreateCategoryService(categoryMemoryRepository);
    fetchAllCategoriesService = new FetchAllCategoriesService(categoryMemoryRepository);
    fetchCategoryByIdService = new FetchCategoryByIdService(categoryMemoryRepository);

    categoryController = new CategoryController(
      createCategoryService,
      fetchAllCategoriesService,
      fetchCategoryByIdService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return status 201 and message "Category created successfully" when category is created', async function () {
    // Arrange
    req = { body: { name: 'Bebidas' } } as unknown as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
    createCategoryService.execute = jest.fn().mockResolvedValue({ categoryId: '1', name: 'Bebidas' });

    // Act
    await categoryController.registerCategory(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ categoryId: '1', message: 'Category created successfully' });
  });

  test('should not be possible to create a category with the same name', async function () {
    // Arrange
    req = { body: { name: 'Bebidas' } } as unknown as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
    createCategoryService.execute = jest.fn().mockRejectedValue(new Conflict('Category already exists'));

    // Act
    await categoryController.registerCategory(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(new Conflict('Category already exists'));
  });

  test('should not be possible to create a category with an invalid name', async function () {
    // Arrange
    req = { body: { name: '' } } as unknown as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
    createCategoryService.execute = jest.fn().mockRejectedValue(new BadRequest('Invalid Name'));

    // Act
    await categoryController.registerCategory(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid Name'));
  });

  test('should not be possible to create a category if name contain special characters', async function () {
    // Arrange
    req = { body: { name: 'Bebidas*' } } as unknown as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
    createCategoryService.execute = jest.fn().mockRejectedValue(new BadRequest('Invalid Name'));

    // Act
    await categoryController.registerCategory(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid Name'));
  });

  test('should be not possible to create a category if name is not provided', async function () {
    // Arrange
    req = { body: { name: undefined } } as unknown as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
    createCategoryService.execute = jest.fn().mockRejectedValue(new BadRequest('Invalid Name'));

    // Act
    await categoryController.registerCategory(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid Name'));
  });
});