import NotFound from '../../../../errors/NotFound';
import { TDistrictCreated, TDistrictInput, TEagerDistrictOutput } from '../../../../types/Address';
import InMemoryCityRepository from '../../city/adapters/InMemoryCityRepository';
import InMemoryStateRepository from '../../state/adapters/InMemoryStateRepository';
import IDistrictRepository from '../IDistrictRepository';

export default class InMemoryDistrictRepository implements IDistrictRepository {

  private _districts: TDistrictCreated[] = [
    { name: 'Sé', cityId: '12314324534', districtId: '123123123' },
    { name: 'Vila Brasileira', cityId: '12314324534', districtId: '123123123' }
  ];
  private _stateRepository = new InMemoryStateRepository();
  private _cityRepository = new InMemoryCityRepository();

  async create(district: TDistrictInput): Promise<TDistrictCreated> {
    const districtId = Math.random().toString();
    const newDistrict = {
      cityId: district.cityId,
      name: district.name,
      districtId,
    };
    this._districts.push(newDistrict);
    return newDistrict;
  }

  // eslint-disable-next-line max-lines-per-function
  async findByDistrictIdOrThrow(districtId: string): Promise<TEagerDistrictOutput> {
    const district = this._districts.find(district => district.districtId === districtId);
    if (!district) throw new NotFound('District does not exist');
    const city = await this._cityRepository.findByCityIdOrThrow(district.cityId);
    const state = await this._stateRepository.findByStateIdOrThrow(city.stateId);
    return {
      districtId: district.districtId,
      name: district.name,
      cityId: district.cityId,
      City: {
        cityId: city.cityId,
        name: city.name,
        stateId: city.stateId,
        State: {
          stateId: state.stateId,
          name: state.name,
          uf: state.uf
        }
      }
    };
  }

}