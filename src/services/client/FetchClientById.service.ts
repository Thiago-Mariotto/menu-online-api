import NotFound from '../../errors/NotFound';
import IClientRepository from '../../repositories/client/IClientRepository';
import { TCreatedClient } from '../../types/Client';
import { IService } from '../IService';

export default class FetchClientById implements IService<string, TCreatedClient> {
  private _clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this._clientRepository = clientRepository;
  }

  async execute(clientId: string): Promise<TCreatedClient> {
    const client = await this._clientRepository.findById(clientId);

    if (!client) {
      throw new NotFound(`Client id ${clientId} not found`);
    }

    return client;
  }
}