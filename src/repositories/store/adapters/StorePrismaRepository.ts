import Store from '../../../entities/Store';
import { TStoreCreated } from '../../../types/Store';
import ConnectionPrismaAdapter from '../../connection/adapters/ConnectionPrismaAdapter';
import IStoreRepository from '../IStoreRepository';

export default class StorePrismaRepository implements IStoreRepository {
  
  private _orm = new ConnectionPrismaAdapter().getConnection();
  
  async findByCNPJ(cnpj: string): Promise<TStoreCreated | null> {
    return this._orm.storeModel.findUnique({
      where: { cnpj }
    });
  }

  async findById(storeId: string): Promise<TStoreCreated | null> {
    return this._orm.storeModel.findUnique({
      where: { storeId }
    });
  }

  async findByUserId(userId: string): Promise<TStoreCreated[]> {
    return this._orm.storeModel.findMany({
      where: { userId, active: true }
    });
  }

  async create(data: Store): Promise<TStoreCreated> {
    const newStore = await this._orm.storeModel.create({
      data: {
        name: data.name,
        cnpj: data.cnpj.value,
        phone: data.phone,
        userId: data.userId,
        storeAddressId: data.addressId,
      }
    });
    return newStore;
  }
}