import NotFound from '../../../errors/NotFound';
import { TInputAddress, TOutputAddressModel } from '../../../types/Address';
import IAddressRepository from '../IAddressRepository';

export default class AddressMemoryRepository implements IAddressRepository {
  private addresses: TOutputAddressModel[] = [
    { addressId: '562d0318-3eb6-4488-ab1b-be4a378e249e', cep: '12414-070', street: 'Rua Ubatuba', districtId: '0059697c-7021-4ba1-97bb-0b7bac157e00' }
  ];

  async getAddressByCEPOrThrow(cepData: string): Promise<TOutputAddressModel> {
    const address = this.addresses.find(address => address.cep === cepData);
    if (!address) throw new NotFound('CEP não encontrado');
    return address;
  }

  create(address: TInputAddress): Promise<TOutputAddressModel> {
    throw new Error('Method not implemented.');
  }

}