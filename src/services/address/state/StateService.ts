import { PrismaClient } from '@prisma/client';

export default class StateService {
private _stateRepository: IStateRepository;
  constructor(private _orm = new PrismaClient()) {
    
  }

  public async getStateNameByIdOrThrow(stateId: string) {
    const state = await this._orm.stateModel.findFirst({ where: { stateId } });
    if (!state) throw new Error('State does not exist');
    return state.name;
  }

}