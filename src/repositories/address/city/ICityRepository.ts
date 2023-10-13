import { TOutputCityModel } from '../../../types/Address';

interface ICityRepository {
  findByCityName(cityName: string): Promise<TOutputCityModel>
}

export default ICityRepository;