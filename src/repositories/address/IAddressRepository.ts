import { TInputAddress, TOutputAddressModel } from '../../types/Address';

interface IAddressRepository {
  getAddressByCEP(cepData: string): Promise<TOutputAddressModel | null>;
  create(address: TInputAddress): Promise<TOutputAddressModel>
}

export default IAddressRepository;