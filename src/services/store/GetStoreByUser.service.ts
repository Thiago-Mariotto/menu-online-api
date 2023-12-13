import IStoreRepository from '../../repositories/store/IStoreRepository';
import { TLoggedInputDTO } from '../../types/Login';
import { TStoreCreated } from '../../types/Store';
import { IService } from '../IService';

export default class GetStoreByUser implements IService<TLoggedInputDTO, TStoreCreated[]> {
  constructor(private _storeRepository: IStoreRepository) { }

  async execute(loggedInput: TLoggedInputDTO): Promise<TStoreCreated[]> {
    const userStores = await this._storeRepository.findByUserId(loggedInput.id);
    return userStores;
  }
}