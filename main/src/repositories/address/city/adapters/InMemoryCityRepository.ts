import NotFound from '../../../../errors/NotFound';
import { TOutputCityModel } from '../../../../types/Address';
import ICityRepository from '../ICityRepository';

export default class InMemoryCityRepository implements ICityRepository {

  private cities: TOutputCityModel[] = [
    { name: 'Pindamonhangaba', cityId: '0059697c-7021-4ba1-97bb-0b7bac157e00', stateId: '418be216-e3ea-46c3-865d-9ceaf118d609' }
  ];

  async findByCityNameOrThrow(cityName: string): Promise<TOutputCityModel> {
    const city = this.cities.find(city => city.name === cityName);
    if (!city) throw new NotFound('City does not exist');
    return city;
  }

  async findByCityIdOrThrow(cityId: string): Promise<TOutputCityModel> {
    const city = this.cities.find(city => city.cityId === cityId);
    if (!city) throw new NotFound('City does not exist');
    return city;
  }
}