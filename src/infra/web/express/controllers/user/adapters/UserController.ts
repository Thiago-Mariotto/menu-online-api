import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import LoginService from '../../../../../../services/authentication/Login.service';
import FetchAllUsersService from '../../../../../../services/user/FetchAllUsers.service';
import FetchUserByIdService from '../../../../../../services/user/FetchUserById.service';
import RegisterUserService from '../../../../../../services/user/RegisterUser.service';
import { TLoginDTO } from '../../../../../../types/Login';
import { TCreationUserDTO } from '../../../../../../types/User';

export default class UserController {

  constructor(
    private readonly _registerUserService: RegisterUserService,
    private readonly _fetchAllUsersService: FetchAllUsersService,
    private readonly _fetchUserByIdService: FetchUserByIdService,
    private readonly _userLoginService: LoginService,
  ) { }

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const userData = req.body as TCreationUserDTO;
      const registeredUser = await this._registerUserService.execute(userData);
      return res.status(201).json({ userId: registeredUser.userId, message: 'User created successfully' });
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