import Store from '../../../entities/Store';
import Conflict from '../../../errors/Conflict';
import { TStoreAddressInput, TOutputAddressStore } from '../../../types/Address';
import { TStoreCreated } from '../../../types/Store';
import StorePrismaRepository from '../adapters/StorePrismaRepository';

export default class StorePrismaRepositoryTransactionDecorator extends StorePrismaRepository {

  constructor(private readonly storePrismaRepository: StorePrismaRepository) {
    super();
  }
  async create(data: Store): Promise<TStoreCreated> {
    try {
      console.log('Start Transaction...');
      await this._orm.$executeRaw`BEGIN;`;
      const result = await this.storePrismaRepository.create(data);
      await this._orm.$executeRaw`COMMIT;`;
      console.log('Commiting...');
      return result;
    } catch (err) {
      console.error(err);
      await this._orm.$executeRaw`ROLLBACK;`;
      console.log('Doing Rollback...');
      throw new Conflict('Erro ao cadastrar loja');
    }
  }

  async createAddress(data: TStoreAddressInput): Promise<TOutputAddressStore> {
    try {
      console.log('Start Transaction...');
      await this._orm.$executeRaw`BEGIN;`;
      const result = this.storePrismaRepository.createAddress(data);
      await this._orm.$executeRaw`COMMIT;`;
      console.log('Commiting...');
      return result;
    } catch (err) {
      console.error(err);
      await this._orm.$executeRaw`ROLLBACK;`;
      console.log('Doing Rollback...');
      throw new Conflict('Erro ao cadastrar loja');
    }
  }
}