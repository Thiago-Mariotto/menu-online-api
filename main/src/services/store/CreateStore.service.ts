/* eslint-disable max-lines-per-function */
import StoreBuilder from '../../entities/StoreBuilder';
import BadRequest from '../../errors/BadRequest';
import Conflict from '../../errors/Conflict';
import IStoreRepository from '../../repositories/store/IStoreRepository';
import { TCreationStoreDTO } from '../../types/Store';
import { IService } from '../IService';
import CacheAddressService from '../address/CacheAddressService';

export default class CreateStoreService implements IService<TCreationStoreDTO, void>{
  constructor(
    private _cacheAddressService: CacheAddressService,
    private _storeRepository: IStoreRepository,
  ) { }

  async execute(data: TCreationStoreDTO): Promise<void> {
    if (data.name.trim().length < 1) {
      throw new BadRequest('O campo nome é obrigatório');
    }
    const address = await this._cacheAddressService.execute(data.cep);
    await this.validateRegister(data);
    try {
      const newStoreAddress = await this._storeRepository.createAddress({
        addressId: address.addressId,
        number: data.number
      });
  
      const store = new StoreBuilder(data.cnpj)
        .setName(data.name)
        .setCep(data.cep)
        .setUserId(data.userId)
        .setPhone(data.phone)
        .setStoreAddressId(newStoreAddress.storeAddressId)
        .build();
  
      await this._storeRepository.create(store);
    } catch (err) {
      throw new Conflict('Erro ao cadastrar loja');
    }
    
  }

  private async validateRegister(data: TCreationStoreDTO) {
    await this.cnpjExists(data.cnpj);
  }

  private async cnpjExists(cnpj: string): Promise<void> {
    const storeExists = await this._storeRepository.findByCNPJ(cnpj);
    if (storeExists) throw new Conflict('CNPJ já cadastrado');
  }
}