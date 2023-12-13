import Store from '../../entities/Store';
import { TStoreCreated } from '../../types/Store';

interface IStoreRepository {
  create(data: Store): Promise<TStoreCreated>;
  findByUserId(userId: string): Promise<TStoreCreated[]>;
  findById(storeId: string): Promise<TStoreCreated | null>;
  findByCNPJ(cnpj: string): Promise<TStoreCreated | null>;
}

export default IStoreRepository;