/* eslint-disable max-lines-per-function */
import { AddressModel, CityModel, DistrictModel, PrismaClient } from '@prisma/client';
import User from '../entities/User';
import { District, ViaCepAddress } from '../types/Address';
import requester from '../utils/requester';

export default class AddressService {
  private static _prisma = new PrismaClient();

  constructor() { }

  public static async getAddressByViaCep(cep: string): Promise<ViaCepAddress> {
    try {
      const response = await requester('https://viacep.com.br/ws/').get(`${cep}/json/`);
      const { data } = response;
      return data;
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

  public static async saveDistrict(district: Omit<District, 'districtId'>): Promise<DistrictModel> {
    const newDistrict = await this._prisma.districtModel.create({
      data: {
        name: district.name,
        cityId: district.cityId,
      }
    });

    return newDistrict;
  }


  // REMOVER REGRA DO LINTER
  public static async saveAddress(address: ViaCepAddress, user: User): Promise<AddressModel> {
    const distric = await AddressService.getDistrictByName(address.bairro);

    if (!distric) {
      const city = await AddressService.getCityByName(address.localidade);
      const newDistrict = await AddressService.saveDistrict({
        name: address.bairro,
        cityId: city.cityId
      });
      user.addressId = newDistrict.districtId;
    } else {
      user.addressId = distric.districtId;
    }

    return await this._prisma.addressModel.create({
      data: {
        cep: address.cep,
        street: address.logradouro,
        number: user.number,
        complement: user.complement,
        districtId: user.addressId
      }
    });
  }
}