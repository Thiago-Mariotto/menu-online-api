import { NextFunction, Request, Response, Router } from 'express';
import ClientController from '../controllers/client/adapters/ClientController';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.get('/:clientId', (req: Request, res: Response, next: NextFunction) =>
  clientController.findClient(req, res, next));

clientRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  clientController.registerClient(req, res, next));

export default clientRouter;