import NotFound from '../../../../errors/NotFound';
import { TOutputStateModel } from '../../../../types/Address';
import IStateRepository from '../IStateRepository';

export default class InMemoryStateRepository implements IStateRepository {

  private _states: TOutputStateModel[] = [
    { name: 'São Paulo', stateId: '418be216-e3ea-46c3-865d-9ceaf118d609', uf: 'SP' }
  ];

  async findByStateIdOrThrow(stateId: string): Promise<TOutputStateModel> {
    const state = this._states.find(state => state.stateId === stateId);
    if (!state) throw new NotFound('State does not exist');
    return state;
  }

}