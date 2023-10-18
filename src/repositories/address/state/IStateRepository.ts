import { TOutputStateModel } from '../../../types/Address';

interface IStateRepository {
  findByStateIdOrThrow(stateId: string): Promise<TOutputStateModel>
}

export default IStateRepository;