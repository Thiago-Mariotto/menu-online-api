import { TDistrictCreated, TDistrictInput } from '../../../types/Address';

interface IDistrictRepository {
  create(district: TDistrictInput): Promise<TDistrictCreated>
}

export default IDistrictRepository;