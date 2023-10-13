import { TAddressServices, TInputSaveAddress, TOutputApiServiceAddress } from '../../types/Address';
import { IService } from '../IService';
import ViaCepAddressFetcher from '../viaCep/ViaCepAddressFetcher.service';
import AddressServiceBuilder from './builders/AddressServiceBuilder';
import IAddressRepository from '../../repositories/address/IAddressRepository';

export default class CacheAddressService implements IService<string, TOutputApiServiceAddress> {

  private addressServices: TAddressServices;
  private addressServicesBuilder = AddressServiceBuilder;
  private _addressRepository: IAddressRepository;
  constructor(
    private _apiService: IService<string, TOutputApiServiceAddress> = new ViaCepAddressFetcher(),
    addressRepository: IAddressRepository) { 
    this.addressServices = this.addressServicesBuilder.buildAddressServices();
    this._addressRepository = addressRepository;
  }

  async execute(cepData: string): Promise<TOutputApiServiceAddress> {
    try {
      const address = await this._addressRepository.getAddressByCEPOrThrow(cepData);
      return address;
    }
    catch (err) {
      return await this.handleCacheFetchStrategy(cepData);
    }
  }

  private async handleCacheFetchStrategy(cepData: string): Promise<TOutputApiServiceAddress> {
    const { cityName, districtName, street, cep } = await this._apiService.execute(cepData);
    const city = await this.addressServices.cityService.getCityByNameOrThrow(cityName);
    const newAddress = await this.saveAddress({
      districtName: districtName,
      cityId: city.cityId,
      cep,
      street
    });
  
    return newAddress;
  }

  private async saveAddress(address: TInputSaveAddress) {
    const newDistrict = await this.addressServices.districtService.saveDistrict({
      name: address.districtName,
      cityId: address.cityId
    });
    return await this._addressRepository.create({
      cep: address.cep,
      districtId: newDistrict.districtId,
      street: address.street
    });
  }
}