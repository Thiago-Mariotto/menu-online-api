import Forbidden from '../../errors/Forbidden';
import IStoreRepository from '../../repositories/store/IStoreRepository';
import { TGetStoreByUserDTO, TStoreCreated } from '../../types/Store';
import { IService } from '../IService';

export default class GetStoreByUser implements IService<TGetStoreByUserDTO, TStoreCreated[]> {
  constructor(private _storeRepository: IStoreRepository) { }

  async execute(data: TGetStoreByUserDTO): Promise<TStoreCreated[]> {
    this._checkIsOwnerOrThrow(data.userId, data.session.id);
    const userStores = await this._storeRepository.findByUserId(data.userId);
    return userStores;
  }

  private _checkIsOwnerOrThrow(userId: string, sessionUserId: string): void {
    if (userId !== sessionUserId) throw new Forbidden('Você não tem permissão para acessar essas informações');
  }
}