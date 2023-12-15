import { NextFunction, Request, Response, Router } from 'express';
import AddressMemoryRepository from '../../../../repositories/address/adapters/AddressMemoryRepository';
import AddressPrismaRepository from '../../../../repositories/address/adapters/AddressPrismaRepository';
import StoreMemoryRepository from '../../../../repositories/store/adapters/StoreMemoryRepository';
import StorePrismaRepository from '../../../../repositories/store/adapters/StorePrismaRepository';
import CacheAddressService from '../../../../services/address/CacheAddressService';
import CreateStoreService from '../../../../services/store/CreateStore.service';
import GetStoreByIdService from '../../../../services/store/GetStoreById.service';
import GetStoreByUser from '../../../../services/store/GetStoreByUser.service';
import ViaCepAddressFetcher from '../../../../services/viaCep/ViaCepAddressFetcher.service';
import StoreController from '../controllers/store/StoreController';
import CheckCredentialMiddleware from '../middlewares/CheckCredential.middleware';
import StorePrismaRepositoryTransactionDecorator from '../../../../repositories/store/decorators/StorePrismaRepositoryTransactionDecorator';

const nodeEnv = process.env.NODE_ENV;

const storeRepository = nodeEnv === 'test' ? new StoreMemoryRepository() : 
  new StorePrismaRepositoryTransactionDecorator(
    new StorePrismaRepository()
  );
const addressRepository = nodeEnv === 'test' ? new AddressMemoryRepository() : new AddressPrismaRepository();

const apiService = new ViaCepAddressFetcher();
const cacheAddressService = new CacheAddressService(apiService, addressRepository);
const createStoreService =
  new CreateStoreService(cacheAddressService, storeRepository);
const getStoresByUser = new GetStoreByUser(storeRepository);
const getStoreById = new GetStoreByIdService(storeRepository);

const checkCredentialsMiddleware = new CheckCredentialMiddleware();
const storeController = new StoreController(createStoreService, getStoresByUser, getStoreById);

const storeRouter = Router();

storeRouter.use((req: Request, res: Response, next: NextFunction) =>
  checkCredentialsMiddleware.verifyToken(req, res, next));

storeRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  storeController.registerStore(req, res, next));

storeRouter.get('/user/:userId', (req: Request, res: Response, next: NextFunction) =>
  storeController.getStoresByUser(req, res, next));

storeRouter.get('/:storeId', (req: Request, res: Response, next: NextFunction) =>
  storeController.getStoreById(req, res, next));

export default storeRouter;
