import { PrismaClient } from '@prisma/client';
import { TOutputStateModel } from '../../../../types/Address';
import IStateRepository from '../IStateRepository';
import NotFound from '../../../../errors/NotFound';

export default class PrismaStateRepository implements IStateRepository {

  private _orm = new PrismaClient();
  
  async findByStateIdOrThrow(stateId: string): Promise<TOutputStateModel> {
    const state = await this._orm.stateModel.findFirst({ where: { stateId } });
    if (!state) throw new NotFound('State does not exist');
    return {
      name: state.name,
      stateId: state.stateId,
      uf: state.uf,
    };
  }

}