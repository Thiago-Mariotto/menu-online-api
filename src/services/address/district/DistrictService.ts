import IDistrictRepository from '../../../repositories/address/district/IDistrictRepository';
import { TDistrictInput } from '../../../types/Address';

export default class DistrictService {

  private _districtRepository: IDistrictRepository;
  constructor(districtRepository: IDistrictRepository) {
    this._districtRepository = districtRepository;
  }
  
  public async saveDistrict(district: TDistrictInput) {
    return await this._districtRepository.create(district);
  }
}