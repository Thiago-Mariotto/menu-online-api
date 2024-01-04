import { TViaCepAddress } from '../../../types/Address';

export default class AddressParser {
  public static parseAddress(address: TViaCepAddress) {
    return {
      cep: address.cep,
      street: address.logradouro,
      districtName: address.bairro,
      cityName: address.localidade,
      stateName: address.uf
    };
  }
}