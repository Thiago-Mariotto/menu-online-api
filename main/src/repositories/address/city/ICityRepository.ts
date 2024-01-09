import { TOutputCityModel } from '../../../types/Address';

interface ICityRepository {
  findByCityNameOrThrow(cityName: string): Promise<TOutputCityModel>
  findByCityIdOrThrow(cityId: string): Promise<TOutputCityModel>
}

export default ICityRepository;