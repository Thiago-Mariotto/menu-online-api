import { AddressModel, CityModel, DistrictModel, PrismaClient } from '@prisma/client';
import { TDistrictInput, TInputAddress, TViaCepAddress } from '../../types/Address';
import requester from '../../utils/requester';

export default class AddressService {
  private static _prisma = new PrismaClient();

  private static async getAddressByViaCep(cep: string) {
    try {
      const response = await requester('https://viacep.com.br/ws/').get(`${cep}/json/`);
      const { data } = response;
      return this.parseAddress(data);
    } catch (err) {
      throw new Error('Cep not found');
    }
  }

  public static async getCityByName(cityName: string): Promise<CityModel> {
    const city = await this._prisma.cityModel.findFirst({
      where: {
        name: cityName
      }
    });

    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  public static async getDistrictByName(districtName: string): Promise<DistrictModel | null> {
    const district = await this._prisma.districtModel.findFirst({
      where: { name: districtName }
    });

    return district || null;
  }

  public static async saveDistrict(district: Omit<TDistrictInput, 'districtId'>): Promise<DistrictModel> {
    const newDistrict = await this._prisma.districtModel.create({
      data: {
        name: district.name,
        cityId: district.cityId,
      }
    });

    return newDistrict;
  }

  public static async getAddressByCep(cep: string): Promise<AddressModel | null> {
    const address = await this._prisma.addressModel.findFirst({
      where: { cep }
    });

    if (!address) {
      return null;
    }

    return address;
  }

  public static async saveAddress(address: TInputAddress): Promise<AddressModel> {
    return await this._prisma.addressModel.create({
      data: {
        cep: address.cep,
        street: address.street,
        districtId: address.districtId
      }
    });
  }

  private static async registerNewAddressFromViaCEP(userCep: string) {
    const { cityName, districtName, street, cep } = await this.getAddressByViaCep(userCep);
    const city = await this.getCityByName(cityName);
    const newDistrict = await this.saveDistrict({
      name: districtName,
      cityId: city.cityId
    });
    return await this.saveAddress({
      cep,
      street,
      districtId: newDistrict.districtId
    });
  }

  private static async getAddressOrThrowError(cep: string) {
    const cepAlreadyRegistered = await this.getAddressByCep(cep);
    return cepAlreadyRegistered;
  }

  private static parseAddress(address: TViaCepAddress) {
    return {
      cep: address.cep,
      street: address.logradouro,
      districtName: address.bairro,
      cityName: address.localidade,
      stateName: address.uf
    };
  }
}