import {  PrismaClient } from '@prisma/client';

export default class CityService {

  constructor(private _orm = new PrismaClient()) {
    
  }

  public async getCityByNameOrThrow(cityName: string) {
    const city = await this._orm.cityModel.findFirst({ where: { name: cityName } });
    if (!city) throw new Error('City does not exist');
    return city;
  }

}