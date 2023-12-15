import { v4 as uuid } from 'uuid';
import Store from '../../../entities/Store';
import { TStoreCreated } from '../../../types/Store';
import IStoreRepository from '../IStoreRepository';
import { TOutputAddressStore, TStoreAddressInput } from '../../../types/Address';

export default class StoreMemoryRepository implements IStoreRepository {
  private _stores: TStoreCreated[];

  constructor() {
    this._stores = [];
  }

  async findByCNPJ(cnpj: string): Promise<TStoreCreated | null> {
    const store = this._stores.find((store) => store.cnpj === cnpj);
    return store || null;
  }
  
  async findById(storeId: string): Promise<TStoreCreated | null> {
    const store = this._stores.find((store) => store.storeId === storeId);
    return store || null;
  }

  async create(data: Store): Promise<TStoreCreated> {
    const newStore: TStoreCreated = {
      storeId: uuid(),
      userId: data.userId,
      active: true,
      cnpj: data.cnpj.value,
      name: data.name,
      phone: data.phone,
      storeAddressId: data.addressId,
    };

    this._stores.push(newStore);
    return newStore;
  }

  async findByUserId(userId: string): Promise<TStoreCreated[]> {
    const stores = this._stores.filter((store) => store.userId === userId);
    return stores;
  }

  private _storeAddresses: TOutputAddressStore[] = [
    { addressId: '562d0318-3eb6-4488-ab1b-be4a378e249e', number: '10', complement: '', storeAddressId: '6c468923-5cdf-494f-a75b-d6b36b0d3a32' }
  ];

  async createAddress(data: TStoreAddressInput): Promise<TOutputAddressStore> {
    const storeAddressId = uuid();
    const newStoreAddress = {
      ...data,
      storeAddressId
    };
    this._storeAddresses.push(newStoreAddress);
    return newStoreAddress;
  }
}