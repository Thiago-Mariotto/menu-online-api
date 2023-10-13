import IStateRepository from '../../../repositories/address/state/IStateRepository.ts/IStateRepository';

export default class StateService {
  private _stateRepository: IStateRepository;
  constructor(stateRepository: IStateRepository) {
    this._stateRepository = stateRepository;
  }

  public async getStateNameByIdOrThrow(stateId: string) {
    const state = await this._stateRepository.findByStateId(stateId);
    if (!state) throw new Error('State does not exist');
    return state.name;
  }

}