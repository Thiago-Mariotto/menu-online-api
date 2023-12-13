import { TOutputAddressStore, TStoreAddressInput } from '../../../../types/Address';
import IStoreAddress from '../IStoreAddressRepository';
import ConnectionPrismaAdapter from '../../../connection/adapters/ConnectionPrismaAdapter';

export default class StoreAddressPrismaRepository implements IStoreAddress {
  
  private _orm = new ConnectionPrismaAdapter().getConnection();
  
  async create(data: TStoreAddressInput): Promise<TOutputAddressStore> {
    const result = await this._orm.storeAddressModel.create({
      data: {
        complement: data.complement || '',
        number: data.number,
        addressId: data.addressId,
      }
    });

    return result;
  }
}