import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import IHash from '../../../../../../repositories/hash/IHash';
import Bcrypt from '../../../../../../repositories/hash/adapters/Bcrypt';
import IUserRepository from '../../../../../../repositories/user/UserRepository';
import UserMemoryRepository from '../../../../../../repositories/user/adapters/UserMemoryRepository';
import FetchAllUsersService from '../../../../../../services/user/FetchAllUsers.service';
import FetchUserByIdService from '../../../../../../services/user/FetchUserById.service';
import RegisterUserService from '../../../../../../services/user/RegisterUser.service';
import { TCreationUserDTO } from '../../../../../../types/User';

export default class UserController {
  private readonly _registerUserService: RegisterUserService;
  private readonly _userRepository: IUserRepository;
  private readonly _hashRepository: IHash;
  private readonly _fetchAllUsersService: FetchAllUsersService;
  private readonly _fetchUserByIdService: FetchUserByIdService;

  constructor() {
    this._userRepository = new UserMemoryRepository();
    this._hashRepository = new Bcrypt();
    this._registerUserService = new RegisterUserService(this._userRepository, this._hashRepository);
    this._fetchAllUsersService = new FetchAllUsersService(this._userRepository);
    this._fetchUserByIdService = new FetchUserByIdService(this._userRepository);
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
}