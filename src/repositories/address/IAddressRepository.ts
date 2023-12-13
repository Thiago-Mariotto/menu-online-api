import { TInputAddress, TOutputAddressModel } from '../../types/Address';

interface IAddressRepository {
  getAddressByCEPOrThrow(cepData: string): Promise<TOutputAddressModel>;
  create(address: TInputAddress): Promise<TOutputAddressModel>
}

export default IAddressRepository;