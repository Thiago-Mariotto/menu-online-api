/* eslint-disable max-lines-per-function */
import { AddressModel, CityModel, DistrictModel, PrismaClient } from '@prisma/client';
import User from '../../entities/User';
import { TDistrictInput, TInputAddress, TViaCepAddress } from '../../types/Address';
import requester from '../../utils/requester';

export default class AddressService {
  private static _prisma = new PrismaClient();

  constructor() { }

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
        number: address.number,
        complement: address.complement,
        districtId: address.districtId,
        userId: address.userId
      }
    });
  }

  public static async checkUserAddress(user: User) {
    console.log('checkUserAddress', user.address.cep);
    const cepAlreadyRegistered = await this.getAddressByCep(user.address.cep);
    if (cepAlreadyRegistered && user.id) {
      console.log('cepAlreadyRegistered');
      return await this.saveAddress({
        cep: cepAlreadyRegistered.cep,
        street: cepAlreadyRegistered.street,
        number: user.address.number,
        complement: user.address.complement,
        districtId: cepAlreadyRegistered.districtId,
        userId: user.id
      });

    } else if (!cepAlreadyRegistered && user.id) {
      console.log('cepNotRegistered');
      const findAddresByViaCep = await this.getAddressByViaCep(user.address.cep);
      const city = await this.getCityByName(findAddresByViaCep.cityName);
      const newDistrict = await this.saveDistrict({
        name: findAddresByViaCep.districtName,
        cityId: city.cityId
      });

      console.log('salvando endereco', findAddresByViaCep.street);
      return await this.saveAddress({
        cep: findAddresByViaCep.cep,
        street: findAddresByViaCep.street,
        number: user.address.number,
        complement: user.address.complement,
        districtId: newDistrict.districtId,
        userId: user.id
      });
    }
    return;
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