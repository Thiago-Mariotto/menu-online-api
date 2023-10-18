import NotFound from '../../../../errors/NotFound';
import { TOutputStateModel } from '../../../../types/Address';
import IStateRepository from '../IStateRepository';

export default class InMemoryStateRepository implements IStateRepository {
  
  private _states: TOutputStateModel[] = [
    { name: 'São Paulo', stateId: '43256573', uf: 'SP' },
    { name: 'Rio de Janeiro', stateId: '98763628', uf: 'RJ' },
  ];

  async findByStateIdOrThrow(stateId: string): Promise<TOutputStateModel> {
    const state = this._states.find(state => state.stateId === stateId);
    if (!state) throw new NotFound('State does not exist');
    return state;
  }

}