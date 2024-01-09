import { TDistrictCreated, TDistrictInput, TEagerDistrictOutput } from '../../../types/Address';

interface IDistrictRepository {
  create(district: TDistrictInput): Promise<TDistrictCreated>
  findByDistrictIdOrThrow(districtId: string): Promise<TEagerDistrictOutput>
}

export default IDistrictRepository;