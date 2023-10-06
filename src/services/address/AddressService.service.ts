import { AddressModel, CityModel, DistrictModel, PrismaClient } from '@prisma/client';
import User from '../../entities/User';
import { TDistrictInput, TInputAddress, TViaCepAddress } from '../../types/Address';
import requester from '../../utils/requester';
import AddressPrismaMapper from '../../utils/mappers/AddressPrismaMapper';

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

  public static async execute(user: User) {
    const address = await this.getUserAddressOrThrowError(user);
    if (!address) {
      return await this.registerNewAddressFromViaCEP(user);
    }
    return await this.saveAddress({
      ...address,
      complement: user.address.complement,
      number: user.address.number
    });
  }

  private static async registerNewAddressFromViaCEP(user: User) {
    const { cityName, street, districtName, cep } = await this.getAddressByViaCep(user.address.cep);
    const city = await this.getCityByName(cityName);
    const newDistrict = await this.saveDistrict({
      name: districtName,
      cityId: city.cityId
    });
    user.address.street = street;
    user.address.cep = cep;
    return await this.saveAddress(Object.assign(
      AddressPrismaMapper.mapAddressFromUser(user), 
      { districtId: newDistrict.districtId }
    ));
  }
    
  private static async getUserAddressOrThrowError(user: User) {
    const cepAlreadyRegistered = await this.getAddressByCep(user.address.cep);
    if (!user.id) throw new Error('user id not found');
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