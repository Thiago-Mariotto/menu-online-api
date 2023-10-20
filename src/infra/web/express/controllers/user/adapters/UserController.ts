import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import IAuth from '../../../../../../repositories/auth/IAuth';
import JWT from '../../../../../../repositories/auth/adapters/JWT';
import IHash from '../../../../../../repositories/hash/IHash';
import Bcrypt from '../../../../../../repositories/hash/adapters/Bcrypt';
import IUserRepository from '../../../../../../repositories/user/UserRepository';
import UserMemoryRepository from '../../../../../../repositories/user/adapters/UserMemoryRepository';
import LoginService from '../../../../../../services/authentication/Login.service';
import FetchAllUsersService from '../../../../../../services/user/FetchAllUsers.service';
import FetchUserByIdService from '../../../../../../services/user/FetchUserById.service';
import RegisterUserService from '../../../../../../services/user/RegisterUser.service';
import { TLoginDTO } from '../../../../../../types/Login';
import { TCreationUserDTO } from '../../../../../../types/User';

export default class UserController {
  private readonly _registerUserService: RegisterUserService;
  private readonly _userRepository: IUserRepository;
  private readonly _hashRepository: IHash;
  private readonly _authRepository: IAuth;
  private readonly _fetchAllUsersService: FetchAllUsersService;
  private readonly _fetchUserByIdService: FetchUserByIdService;
  private readonly _userLoginService: LoginService;
  private readonly SECRET_KEY = process.env.SECRET_KEY || 'secret';

  constructor() {
    this._userRepository = new UserMemoryRepository();
    this._hashRepository = new Bcrypt();
    this._authRepository = new JWT(this.SECRET_KEY);
    this._registerUserService = new RegisterUserService(this._userRepository, this._hashRepository);
    this._fetchAllUsersService = new FetchAllUsersService(this._userRepository);
    this._fetchUserByIdService = new FetchUserByIdService(this._userRepository);
    this._userLoginService = new LoginService(this._userRepository, this._authRepository, this._hashRepository);
  }

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const userData = req.body as TCreationUserDTO;
      await this._registerUserService.execute(userData);
      return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      next(err);
    }
  }

  async listUsers(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const users = await this._fetchAllUsersService.execute();
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async findUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { userId } = req.params;
      const user = await this._fetchUserByIdService.execute(userId);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as TLoginDTO;
      const token = await this._userLoginService.execute(userData);
      return res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }
}