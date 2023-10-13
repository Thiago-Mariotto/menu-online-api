import ICityRepository from '../../../repositories/address/city/ICityRepository';

export default class CityService {

  private _cityRepository: ICityRepository;
  constructor(cityRepository: ICityRepository) {
    this._cityRepository = cityRepository;
  }

  public async getCityByNameOrThrow(cityName: string) {
    const city = await this._cityRepository.findByCityNameOrThrow(cityName);
    if (!city) throw new Error('City does not exist');
    return city;
  }

}