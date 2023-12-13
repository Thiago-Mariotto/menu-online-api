import { TOutputAddressStore, TStoreAddressInput } from '../../../types/Address';

interface IStoreAddress {
  create(data: TStoreAddressInput): Promise<TOutputAddressStore>;
}

export default IStoreAddress;