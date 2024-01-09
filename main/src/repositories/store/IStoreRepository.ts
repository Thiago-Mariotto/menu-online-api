import Store from '../../entities/Store';
import { TOutputAddressStore, TStoreAddressInput } from '../../types/Address';
import { TStoreCreated } from '../../types/Store';

interface IStoreRepository {
  create(data: Store): Promise<TStoreCreated>;
  findByUserId(userId: string): Promise<TStoreCreated[]>;
  findById(storeId: string): Promise<TStoreCreated | null>;
  findByCNPJ(cnpj: string): Promise<TStoreCreated | null>;
  createAddress(data: TStoreAddressInput): Promise<TOutputAddressStore>;
}

export default IStoreRepository;