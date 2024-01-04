import { NextFunction, Request, Response, Router } from 'express';
import JWT from '../../../../repositories/auth/adapters/JWT';
import Bcrypt from '../../../../repositories/hash/adapters/Bcrypt';
import UserMemoryRepository from '../../../../repositories/user/adapters/UserMemoryRepository';
import UserPrismaRepository from '../../../../repositories/user/adapters/UserPrismaRepository';
import LoginService from '../../../../services/authentication/Login.service';
import FetchAllUsersService from '../../../../services/user/FetchAllUsers.service';
import FetchUserByIdService from '../../../../services/user/FetchUserById.service';
import RegisterUserService from '../../../../services/user/RegisterUser.service';
import UserController from '../controllers/user/adapters/UserController';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';
const userRepository = process.env.NODE_ENV === 'test' ?
  new UserMemoryRepository() : new UserPrismaRepository();
const hashRepository = new Bcrypt();
const authRepository = new JWT(SECRET_KEY);

const registerUserService = new RegisterUserService(userRepository, hashRepository);
const fetchAllUsersService = new FetchAllUsersService(userRepository);
const fetchUserByIdService = new FetchUserByIdService(userRepository);
const loginService = new LoginService(userRepository, authRepository, hashRepository);

const userRouter = Router();
const userController = new UserController(registerUserService, fetchAllUsersService, fetchUserByIdService, loginService);

userRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  userController.listUsers(req, res, next));

userRouter.get('/:userId', (req: Request, res: Response, next: NextFunction) =>
  userController.findUser(req, res, next));

userRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  userController.registerUser(req, res, next));

userRouter.post('/login', (req: Request, res: Response, next: NextFunction) =>
  userController.userLogin(req, res, next));

export default userRouter;