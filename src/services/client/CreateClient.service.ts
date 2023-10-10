import Client from '../../entities/Client';
import IClientRepository from '../../entities/repositories/ClientRepository';
import Conflict from '../../errors/Conflict';
import { TCreatedClient, TCreationClientDTO } from '../../types/Client';
import { IService } from '../IService';

export default class CreateClientService implements IService<TCreationClientDTO, TCreatedClient> {
  private _clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this._clientRepository = clientRepository;
  }

  async execute(clientDTO: TCreationClientDTO): Promise<TCreatedClient> {
    const client = new Client(clientDTO.name, clientDTO.phone, clientDTO.email);
    const clientAlreadyExists = await this._clientRepository.findByEmail(client.email.value);
    if (clientAlreadyExists) throw new Conflict('Client already exists');

    return await this._clientRepository.create(client);
  }
}