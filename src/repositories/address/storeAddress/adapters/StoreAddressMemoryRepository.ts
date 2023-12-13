import { v4 as uuid } from 'uuid';
import { TOutputAddressStore, TStoreAddressInput } from '../../../../types/Address';
import IStoreAddress from '../IStoreAddressRepository';
export default class StoreAddressMemoryRepository implements IStoreAddress {
  private _storeAddresses: TOutputAddressStore[] = [
    { addressId: '562d0318-3eb6-4488-ab1b-be4a378e249e', number: '10', complement: '', storeAddressId: '6c468923-5cdf-494f-a75b-d6b36b0d3a32' }
  ];

  async create(data: TStoreAddressInput): Promise<TOutputAddressStore> {
    const storeAddressId = uuid();
    const newStoreAddress = {
      ...data,
      storeAddressId
    };
    this._storeAddresses.push(newStoreAddress);
    return newStoreAddress;
  }
}