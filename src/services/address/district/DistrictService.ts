import { PrismaClient } from '@prisma/client';

export default class DistrictService {
  
  constructor(private _orm = new PrismaClient()) {
    
  }
  
  public async saveDistrict(district: { name: string, cityId: string}) {
    return await this._orm.districtModel.create({
      data: {
        name: district.name,
        cityId: district.cityId
      }
    });
  }

}