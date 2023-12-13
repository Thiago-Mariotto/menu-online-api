import { NextFunction, Request, Response } from 'express';
import BadRequest from '../../../../src/errors/BadRequest';
import Conflict from '../../../../src/errors/Conflict';
import UserController from '../../../../src/infra/web/express/controllers/user/adapters/UserController';
import IHash from '../../../../src/repositories/hash/IHash';
import Bcrypt from '../../../../src/repositories/hash/adapters/Bcrypt';
import IUserRepository from '../../../../src/repositories/user/UserRepository';
import UserMemoryRepository from '../../../../src/repositories/user/adapters/UserMemoryRepository';
import LoginService from '../../../../src/services/authentication/Login.service';
import FetchAllUsersService from '../../../../src/services/user/FetchAllUsers.service';
import FetchUserByIdService from '../../../../src/services/user/FetchUserById.service';
import RegisterUserService from '../../../../src/services/user/RegisterUser.service';
import { validUser } from '../../../mocks/user.mock';

describe('# Unit - Controller => Create User Controller', function () {
  let userController: UserController;
  let userRepository: IUserRepository;
  let hasRepository: IHash;
  let registerUserService: RegisterUserService;
  let fetchAllUsersService: FetchAllUsersService;
  let FetchUserById: FetchUserByIdService;
  let loginService: LoginService;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(function () {
    userRepository = new UserMemoryRepository();
    hasRepository = new Bcrypt();
    registerUserService = new RegisterUserService(userRepository, hasRepository);

    userController = new UserController(registerUserService, fetchAllUsersService, FetchUserById, loginService);
    req = {} as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as NextFunction;
  });

  afterEach(function () {
    jest.clearAllMocks();
  })

  test('should return status 201 and message when user is created', async function () {
    req.body = { ...validUser };
    registerUserService.execute = jest.fn().mockResolvedValue(validUser);

    await userController.registerUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
  });

  test('should throw bad request error with invalid name', async function () {
    req.body = { ...validUser, name: 'a' };
    registerUserService.execute = jest.fn().mockRejectedValue(new BadRequest('Invalid Name'));

    await userController.registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid Name'));
  });

  test('should throw bad request error with invalid mail', async function () {
    req.body = { ...validUser, email: 'invalid.mail' };
    registerUserService.execute = jest.fn().mockRejectedValue(new BadRequest('Invalid Email'));

    await userController.registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid Email'));
  });

  test('should throw bad request error with invalid cpf', async function () {
    req.body = { ...validUser, cpf: '970.533.250-91' };
    registerUserService.execute = jest.fn().mockRejectedValue(new BadRequest('Invalid CPF'));

    await userController.registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid CPF'));
  });

  test('should throw bad request with invalid password', async function () {
    req.body = { ...validUser, password: '1234Abc##' };
    registerUserService.execute = jest.fn().mockRejectedValue(new BadRequest('Invalid Password'));

    await userController.registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid Password'));
  });

  test('should throw conflict error with user already exists', async function () {
    req.body = { ...validUser };
    registerUserService.execute = jest.fn().mockRejectedValue(new Conflict('User already exists'));

    await userController.registerUser(req, res, next);

    expect(next).toHaveBeenCalledWith(new Conflict('User already exists'));
  });
});