import StoreBuilder from '../../entities/StoreBuilder';
import Conflict from '../../errors/Conflict';
import IStoreAddressRepository from '../../repositories/address/storeAddress/IStoreAddressRepository';
import IStoreRepository from '../../repositories/store/IStoreRepository';
import { TCreationStoreDTO } from '../../types/Store';
import { IService } from '../IService';
import CacheAddressService from '../address/CacheAddressService';

export default class CreateStoreService implements IService<TCreationStoreDTO, void>{
  constructor(
    private _cacheAddressService: CacheAddressService,
    private _storeRepository: IStoreRepository,
    private _storeAddressRepository: IStoreAddressRepository
  ) { }

  async execute(data: TCreationStoreDTO): Promise<void> {
    await this.validateRegister(data);
    const address = await this._cacheAddressService.execute(data.cep);
    const newStoreAddress = await this._storeAddressRepository.create({
      addressId: address.addressId,
      number: data.number
    });

    // implementar TRANSACTIONS

    const store = new StoreBuilder(data.cnpj)
      .setName(data.name)
      .setCep(data.cep)
      .setUserId(data.userId)
      .setPhone(data.phone)
      .setStoreAddressId(newStoreAddress.storeAddressId)
      .build();

    await this._storeRepository.create(store);
  }



  private async validateRegister(data: TCreationStoreDTO) {
    await this.cnpjExists(data.cnpj);
  }

  private async cnpjExists(cnpj: string): Promise<void> {
    const storeExists = await this._storeRepository.findByCNPJ(cnpj);
    if (storeExists) throw new Conflict('CNPJ já cadastrado');
  }
}