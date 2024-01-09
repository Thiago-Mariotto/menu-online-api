import { TOutputAddressStore, TStoreAddressInput } from '../../../types/Address';

interface IStoreAddress {
  createAddress(data: TStoreAddressInput): Promise<TOutputAddressStore>;
}

export default IStoreAddress;