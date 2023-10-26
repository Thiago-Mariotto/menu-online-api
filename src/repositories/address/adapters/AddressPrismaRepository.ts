import { PrismaClient } from '@prisma/client';
import NotFound from '../../../errors/NotFound';
import { TInputAddress, TOutputApiServiceAddress } from '../../../types/Address';
import IAddressRepository from '../IAddressRepository';

export default class PrismaAddressAdapter implements IAddressRepository {

  private _orm = new PrismaClient();

  async getAddressByCEPOrThrow(cepData: string): Promise<TOutputApiServiceAddress> {
    const address = await this._orm.addressModel.findFirst({ where: { cep: cepData }, 
      include: { District: { include: { City: { 
        include: { State: true } } } } } });
    if (!address) throw new NotFound('Address does not exist');
    return {
      cityName: address.District.City.name,
      districtName: address.District.name,
      stateName: address.District.City.State.name,
      cep: address.cep,
      street: address.street,
    };
  }
  
  async create(address: TInputAddress): Promise<TOutputApiServiceAddress> {
    const newAddress = await this._orm.addressModel.create({
      data: { cep: address.cep, districtId: address.districtId, street: address.street }
    });
    const district = await this._orm.districtModel.findFirst(
      { where: { districtId: newAddress.districtId }, 
        include: { City: { include: { State: true } } } });
    if (!district) throw new NotFound('District does not exist');

    return {
      districtName: district.name,
      stateName: district.City.State.name,
      cityName: district.City.name,
      cep: newAddress.cep,
      street: newAddress.street,
    };
  }
}