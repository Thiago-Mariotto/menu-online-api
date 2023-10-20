import NotFound from '../../../errors/NotFound';
import { TOutputApiServiceAddress, TInputAddress } from '../../../types/Address';
import IAddressRepository from '../IAddressRepository';
import InMemoryDistrictRepository from '../district/adapters/InMemoryDistrictRepository';

export default class InMemoryAddressRepository implements IAddressRepository {

  private _districtRepository = new InMemoryDistrictRepository();

  private addresses: TOutputApiServiceAddress[] = [
    { cep: '01001-000', cityName: 'São Paulo', districtName: 'Sé', stateName: 'São Paulo', street: 'Praça da Sé' },
    { cep: '08737380', cityName: 'Mogi das Cruzes', districtName: 'Vila Brasileira', stateName: 'São Paulo', street: 'Rua Professor Flaviano de Melo' },
  ];
  
  async getAddressByCEPOrThrow(cepData: string): Promise<TOutputApiServiceAddress> {
    const address = this.addresses.find(address => address.cep === cepData);
    if (!address) throw new NotFound('Address does not exist');
    return address;
  }

  async create(address: TInputAddress): Promise<TOutputApiServiceAddress> {
    const district = await this._districtRepository.findByDistrictIdOrThrow(address.districtId);
    const newAddress = {
      cep: address.cep,
      districtName: district.name,
      stateName: district.City.State.name,
      cityName: district.City.name,
      street: address.street
    };
    return newAddress;
  }

}