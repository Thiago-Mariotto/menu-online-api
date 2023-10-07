import { PrismaClient } from '@prisma/client';
import { TOutputApiServiceAddress } from '../../types/Address';
import { IService } from '../IService';
import ViaCepAddressFetcher from '../viaCep/ViaCepAddressFetcher.service';

export default class AddressService implements IService<string, TOutputApiServiceAddress> {

  constructor(
    private _apiService: IService<string, TOutputApiServiceAddress> = new ViaCepAddressFetcher(),
    private _orm = new PrismaClient()) { }

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
    const city = await this.getCityByNameOrThrow(cityName);
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
      stateName: await this.getStateNameByIdOrThrow(city.stateId),
      street
    };
  }

  private async saveAddress(address: { districtName: string, cityId: string, cep: string, street: string }) {
    const newDistrict = await this.saveDistrict({
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

  private async getStateNameByIdOrThrow(stateId: string) {
    const state = await this._orm.stateModel.findFirst({ where: { stateId } });
    if (!state) throw new Error('State does not exist');
    return state.name;
  }

  private async getCityByNameOrThrow(cityName: string) {
    const city = await this._orm.cityModel.findFirst({ where: { name: cityName } });
    if (!city) throw new Error('City does not exist');
    return city;
  }

  private async saveDistrict(district: { name: string, cityId: string}) {
    return await this._orm.districtModel.create({
      data: {
        name: district.name,
        cityId: district.cityId
      }
    });
  }

  private async getAddressOrThrowError(cep: string) {
    const cepAlreadyRegistered = await this.getAddressByCep(cep);
    if (!cepAlreadyRegistered) throw new Error('Cep does not exist');
    return cepAlreadyRegistered;
  }

  private getAddressByCep(cep: string) {
    return this._orm.addressModel.findFirst({ where: { cep } });
  }
}