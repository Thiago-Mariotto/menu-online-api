/* eslint-disable max-lines-per-function */
import StoreBuilder from '../../entities/StoreBuilder';
import BadRequest from '../../errors/BadRequest';
import Conflict from '../../errors/Conflict';
import IStoreAddressRepository from '../../repositories/address/storeAddress/IStoreAddressRepository';
import ConnectionPrismaAdapter from '../../repositories/connection/adapters/ConnectionPrismaAdapter';
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
    const prismaClient = new ConnectionPrismaAdapter().getConnection();
    const address = await this._cacheAddressService.execute(data.cep);
    try {
      // Start transaction
      await this.validateRegister(data);
      await prismaClient.$executeRaw`BEGIN;`;
      const newStoreAddress = await this._storeAddressRepository.create({
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
      await prismaClient.$executeRaw`COMMIT;`;
      // commit
    } catch (err) {
      await prismaClient.$executeRaw`ROLLBACK;`;
      console.log(err);
      throw new Conflict('Erro ao cadastrar loja');
      // rollback
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