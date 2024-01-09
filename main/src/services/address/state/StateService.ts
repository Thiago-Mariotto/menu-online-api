import NotFound from '../../../errors/NotFound';
import IStateRepository from '../../../repositories/address/state/IStateRepository';

export default class StateService {
  private _stateRepository: IStateRepository;
  constructor(stateRepository: IStateRepository) {
    this._stateRepository = stateRepository;
  }

  public async getStateNameByIdOrThrow(stateId: string) {
    const state = await this._stateRepository.findByStateIdOrThrow(stateId);
    if (!state) throw new NotFound('State does not exist');
    return state.name;
  }

}