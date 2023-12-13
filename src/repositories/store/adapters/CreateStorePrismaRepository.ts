import StoreBuilder from '../../../entities/StoreBuilder';
import { TOutputAddressModel } from '../../../types/Address';
import { TCreationStoreDTO } from '../../../types/Store';
import IStoreAddress from '../../address/storeAddress/IStoreAddressRepository';
import ConnectionPrismaAdapter from '../../connection/adapters/ConnectionPrismaAdapter';
import IStoreRepository from '../IStoreRepository';

export default class CreateStorePrismaRepository {
  private _prismaConnection = new ConnectionPrismaAdapter().getConnection();
  constructor(
    private _storeAddressRepository: IStoreAddress,
    private _storeRepository: IStoreRepository
  ) { }

  public async execute(address: TOutputAddressModel, storeDTO: TCreationStoreDTO) {
    const newStoreAddress = await this._storeAddressRepository.create({
      addressId: address.addressId,
      number: storeDTO.number
    });

    const store = new StoreBuilder(storeDTO.cnpj)
      .setName(storeDTO.name)
      .setCep(storeDTO.cep)
      .setUserId(storeDTO.userId)
      .setPhone(storeDTO.phone)
      .setStoreAddressId(newStoreAddress.storeAddressId)
      .build();


  }
}