import IAddressRepository from '../../repositories/address/IAddressRepository';
import { TAddressServices, TInputSaveAddress, TOutputAddressModel, TOutputApiServiceAddress } from '../../types/Address';
import { IService } from '../IService';
import AddressServiceBuilder from './builders/AddressServiceBuilder';

export default class CacheAddressService implements IService<string, TOutputAddressModel> {

  private addressServices: TAddressServices;
  private addressServicesBuilder = AddressServiceBuilder;
  private _addressRepository: IAddressRepository;
  constructor(
    private _apiService: IService<string, TOutputApiServiceAddress>,
    addressRepository: IAddressRepository) {
    this.addressServices = this.addressServicesBuilder.buildAddressServices();
    this._addressRepository = addressRepository;
  }

  async execute(cepData: string): Promise<TOutputAddressModel> {
    const address = await this._addressRepository.getAddressByCEPOrThrow(cepData);
    if (address) return address;
    return await this.handleCacheFetchStrategy(cepData);
  }

  private async handleCacheFetchStrategy(cepData: string): Promise<TOutputAddressModel> {
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