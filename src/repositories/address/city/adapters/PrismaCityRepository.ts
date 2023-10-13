import { PrismaClient } from '@prisma/client';
import { TOutputCityModel } from '../../../../types/Address';
import ICityRepository from '../ICityRepository';

export default class PrismaCityRepository implements ICityRepository {
  private _orm = new PrismaClient();

  async findByCityName(cityName: string): Promise<TOutputCityModel> {
    const city = await this._orm.cityModel.findFirst({ where: { name: cityName } });
    if (!city) throw new Error('City does not exist');
    return {
      cityId: city.cityId,
      name: city.name,
      stateId: city.stateId,
    };
  }
}