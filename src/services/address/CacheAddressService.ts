import { PrismaClient } from '@prisma/client';
import { TAddressServices, TOutputApiServiceAddress } from '../../types/Address';
import { IService } from '../IService';
import ViaCepAddressFetcher from '../viaCep/ViaCepAddressFetcher.service';
import AddressServiceBuilder from './builders/AddressServiceBuilder';

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
      const address = await this.getAddressOrThrowError(cepData);

      return {
        cep: address.cep,
        cityName: '',
        districtName: '',
        stateName: '',
        street: address.street
      };
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
    
    return {
      cep: newAddress.cep,
      cityName,
      districtName,
      stateName: await this.addressServices.stateService.getStateNameByIdOrThrow(city.stateId),
      street
    };
  }

  private async saveAddress(address: { districtName: string, cityId: string, cep: string, street: string }) {
    const newDistrict = await this.addressServices.districtService.saveDistrict({
      name: address.districtName,
      cityId: address.cityId
    });
    return await this._orm.addressModel.create({
      data: {
        cep: address.cep,
        street: address.street,
        districtId: newDistrict.districtId
      }
    });
  }

  private async getAddressOrThrowError(cep: string) {
    const cepAlreadyRegistered = await this.getAddressByCep(cep);
    if (!cepAlreadyRegistered) throw new Error('Cep does not exist');
    return cepAlreadyRegistered;
  }

  private getAddressByCep(cep: string) {
    return this._addressRepository.findFirst({ where: { cep } });
  }
}