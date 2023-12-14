import Forbidden from '../../errors/Forbidden';
import NotFound from '../../errors/NotFound';
import IStoreRepository from '../../repositories/store/IStoreRepository';
import { TGetStoreDTO, TStoreCreated } from '../../types/Store';
import { IService } from '../IService';

export default class GetStoreByIdService implements
  IService<TGetStoreDTO, Promise<TStoreCreated>> {
  constructor(
    private _storeRepository: IStoreRepository
  ) { }

  public async execute(data: TGetStoreDTO):
    Promise<Promise<TStoreCreated>> {
    const store = await this._storeRepository.findById(data.storeId);
    if (!store) throw new NotFound('Loja não encontrada');
    this._checkIsOwnerOrThrow(store.userId, data.session.id);
    return store;
  }

  private _checkIsOwnerOrThrow(storeId: string, sessionUserId: string): void {
    if (storeId !== sessionUserId)
      throw new Forbidden('Você não tem permissão para acessar essa loja');
  }
}