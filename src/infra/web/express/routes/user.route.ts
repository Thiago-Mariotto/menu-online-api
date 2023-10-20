import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/user/adapters/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  userController.listUsers(req, res, next));

userRouter.get('/:userId', (req: Request, res: Response, next: NextFunction) =>
  userController.findUser(req, res, next));

userRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  userController.registerUser(req, res, next));


export default userRouter;