import { TOutputApiServiceAddress } from '../../types/Address';
import requester from '../../utils/requester';
import { IService } from '../IService';
import AddressParser from './helpers/AddressParser';

export default class ViaCepAddressFetcher implements IService<string, TOutputApiServiceAddress> {

  private baseUrl = 'https://viacep.com.br/ws/';
  
  public async execute(cep: string) {
    try {
      const response = await requester(this.baseUrl).get(`${cep}/json/`);
      const { data } = response;
      return AddressParser.parseAddress(data);
    } catch (err) {
      throw new Error('Cep not found');
    }
  }
}