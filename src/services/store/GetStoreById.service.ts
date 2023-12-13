import Forbidden from '../../errors/Forbidden';
import NotFound from '../../errors/NotFound';
import IStoreRepository from '../../repositories/store/IStoreRepository';
import { TLoggedInputDTO } from '../../types/Login';
import { TStoreCreated } from '../../types/Store';
import { IService } from '../IService';

export default class GetStoreByIdService implements
  IService<TLoggedInputDTO, Promise<TStoreCreated>> {
  constructor(
    private _storeRepository: IStoreRepository
  ) { }

  public async execute(storeDTO: TLoggedInputDTO):
    Promise<Promise<TStoreCreated>> {
    const store = await this._storeRepository.findById(storeDTO.id);

    console.log('userId', storeDTO.loggedUser.id);
    console.log('storeId', storeDTO.id);

    if (!store) throw new NotFound('Loja não encontrada');
    if (store.userId !== storeDTO.loggedUser.id)
      throw new Forbidden('Você não tem permissão para acessar essa loja');
    return store;
  }
}