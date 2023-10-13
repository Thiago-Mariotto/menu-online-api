import { TOutputCityModel } from '../../../../types/Address';
import ICityRepository from '../ICityRepository';

export default class InMemoryCityRepository implements ICityRepository {
  
  private cities: TOutputCityModel[] = [
    { name: 'São Paulo', cityId: '43256573', stateId: '43256573' },
    { name: 'Rio de Janeiro', cityId: '98763628', stateId: '98763628'}
  ];
  
  async findByCityNameOrThrow(cityName: string): Promise<TOutputCityModel> {
    const city = this.cities.find(city => city.name === cityName);
    if (!city) throw new Error('City does not exist');
    return city;
  }

  async findByCityIdOrThrow(cityId: string): Promise<TOutputCityModel> {
    const city = this.cities.find(city => city.cityId === cityId);
    if (!city) throw new Error('City does not exist');
    return city;
  }
}