import { NextFunction, Request, Response } from 'express';
import CreateStoreService from '../../../../../services/store/CreateStore.service';
import GetStoreByIdService from '../../../../../services/store/GetStoreById.service';
import GetStoreByUser from '../../../../../services/store/GetStoreByUser.service';

export default class StoreController {
  constructor(
    private _createStoreService: CreateStoreService,
    private _getStoresByUser: GetStoreByUser,
    private _getStoreById: GetStoreByIdService
  ) { }

  public async registerStore(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.body.user.id;
      const data = { ...req.body, userId };
      await this._createStoreService.execute(data);
      return res.status(201).json({ message: 'Loja cadastrada com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  public async getStoresByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const stores = await this._getStoresByUser.execute({ userId, session: req.body.user });
      return res.status(200).json(stores);
    } catch (error) {
      next(error);
    }
  }

  public async getStoreById(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.params;
      const store = await this._getStoreById.execute({ storeId, session: req.body.user });
      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
}