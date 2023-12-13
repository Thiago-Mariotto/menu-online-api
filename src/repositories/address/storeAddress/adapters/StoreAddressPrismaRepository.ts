import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { TOutputAddressStore, TStoreAddressInput } from '../../../../types/Address';
import IStoreAddress from '../IStoreAddressRepository';

export default class StoreAddressPrismaRepository implements IStoreAddress {
  private _prisma: PrismaClient;
  private _storeAddressModel: Prisma.StoreAddressModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new PrismaClient();
    this._storeAddressModel = this._prisma.storeAddressModel;
  }

  async create(data: TStoreAddressInput): Promise<TOutputAddressStore> {
    const result = await this._storeAddressModel.create({
      data: {
        complement: data.complement || '',
        number: data.number,
        addressId: data.addressId,
      }
    });

    return result;
  }
}