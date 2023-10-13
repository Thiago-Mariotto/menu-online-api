import { TOutputStateModel } from '../../../../types/Address';

interface IStateRepository {
  findByStateId(stateId: string): Promise<TOutputStateModel>
}

export default IStateRepository;