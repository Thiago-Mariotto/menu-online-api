import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import Store from '../../../entities/Store';
import { TStoreCreated } from '../../../types/Store';
import ConnectionPrismaAdapter from '../../connection/adapters/ConnectionPrismaAdapter';
import IStoreRepository from '../IStoreRepository';

export default class StorePrismaRepository implements IStoreRepository {
  protected _prisma: PrismaClient;
  private _storeModel: Prisma.StoreModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new ConnectionPrismaAdapter().getConnection();
    this._storeModel = this._prisma.storeModel;
  }

  async findByCNPJ(cnpj: string): Promise<TStoreCreated | null> {
    return this._storeModel.findUnique({
      where: { cnpj }
    });
  }

  async findById(storeId: string): Promise<TStoreCreated | null> {
    return this._storeModel.findUnique({
      where: { storeId }
    });
  }

  async findByUserId(userId: string): Promise<TStoreCreated[]> {
    return this._storeModel.findMany({
      where: { userId, active: true }
    });
  }

  async create(data: Store): Promise<TStoreCreated> {
    const newStore = await this._storeModel.create({
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