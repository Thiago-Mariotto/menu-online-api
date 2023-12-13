import NotFound from '../../../errors/NotFound';
import { TInputAddress, TOutputAddressModel } from '../../../types/Address';
import IAddressRepository from '../IAddressRepository';
import ConnectionPrismaAdapter from '../../connection/adapters/ConnectionPrismaAdapter';

export default class PrismaAddressAdapter implements IAddressRepository {

  private _orm = new ConnectionPrismaAdapter().getConnection();

  async getAddressByCEPOrThrow(cepData: string): Promise<TOutputAddressModel> {
    const address = await this._orm.addressModel.findFirst({ where: { cep: cepData }, 
      include: { District: { include: { City: { 
        include: { State: true } } } } } });
    if (!address) throw new NotFound('CEP não encontrado');
    return {
      addressId: address.addressId,
      cep: address.cep,
      street: address.street,
      districtId: address.districtId,
    };
  }
  
  async create(address: TInputAddress): Promise<TOutputAddressModel> {
    const newAddress = await this._orm.addressModel.create({
      data: { cep: address.cep, districtId: address.districtId, street: address.street }
    });
    const district = await this._orm.districtModel.findFirst(
      { where: { districtId: newAddress.districtId }, 
        include: { City: { include: { State: true } } } });
    if (!district) throw new NotFound('District does not exist');

    return {
      cep: newAddress.cep,
      street: newAddress.street,
      addressId: newAddress.addressId,
      districtId: newAddress.districtId,
    };
  }
}