import { TInputAddress, TOutputApiServiceAddress } from '../../types/Address';

interface IAddressRepository {
  getAddressByCEPOrThrow(cepData: string): Promise<TOutputApiServiceAddress>;
  create(address: TInputAddress): Promise<TOutputApiServiceAddress>
}

export default IAddressRepository;