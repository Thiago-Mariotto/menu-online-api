import { NextFunction, Request, Response, Router } from 'express';
import ClientMemoryRepository from '../../../../repositories/client/adapters/ClientMemoryRepository';
import ClientPrismaRepository from '../../../../repositories/client/adapters/ClientPrismaRepository';
import CreateClientService from '../../../../services/client/CreateClient.service';
import FetchClientByIdService from '../../../../services/client/FetchClientById.service';
import ClientController from '../controllers/client/adapters/ClientController';

const NODE_ENV = process.env.NODE_ENV || 'development';
const clientRepository = NODE_ENV === 'test' || NODE_ENV === 'development' ?
  new ClientMemoryRepository() : new ClientPrismaRepository();

const createClientService = new CreateClientService(clientRepository);
const fetchClientByIdService = new FetchClientByIdService(clientRepository);

const clientRouter = Router();
const clientController = new ClientController(createClientService, fetchClientByIdService);

clientRouter.get('/:clientId', (req: Request, res: Response, next: NextFunction) =>
  clientController.findClient(req, res, next));

clientRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  clientController.registerClient(req, res, next));

export default clientRouter;