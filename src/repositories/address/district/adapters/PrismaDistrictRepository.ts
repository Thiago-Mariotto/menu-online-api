import { PrismaClient } from '@prisma/client';
import { TDistrictInput, TDistrictCreated, TEagerDistrictOutput } from '../../../../types/Address';
import IDistrictRepository from '../IDistrictRepository';

export default class PrismaDistrictRepository implements IDistrictRepository {
  
  private _orm = new PrismaClient();
  
  async create(district: TDistrictInput): Promise<TDistrictCreated> {
    const createdDistrict = await this._orm.districtModel.create({ 
      data: {
        name: district.name,
        cityId: district.cityId
      }
    });
    return {
      cityId: createdDistrict.cityId,
      districtId: createdDistrict.districtId,
      name: createdDistrict.name
    };
  }

  async findByDistrictIdOrThrow(districtId: string): Promise<TEagerDistrictOutput> {
    const district = await this._orm.districtModel.findFirst({ where: { districtId },
      include: { City: { include: { State: true } } } });
    if (!district) throw new Error('District does not exist');
    return district;
  }

}