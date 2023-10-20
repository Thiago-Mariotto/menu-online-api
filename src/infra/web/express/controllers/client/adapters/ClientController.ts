import { NextFunction, Request, Response } from 'express';
import IClientRepository from '../../../../../../repositories/client/IClientRepository';
import ClientMemoryRepository from '../../../../../../repositories/client/adapters/ClientMemoryRepository';
import CreateClientService from '../../../../../../services/client/CreateClient.service';
import FetchClientByIdService from '../../../../../../services/client/FetchClientById.service';
import { TCreationClientDTO } from '../../../../../../types/Client';

export default class ClientController {
  private _clientRepository: IClientRepository;
  private _createClientService: CreateClientService;
  private _fetchClientById: FetchClientByIdService;

  constructor() {
    this._clientRepository = new ClientMemoryRepository();
    this._createClientService = new CreateClientService(this._clientRepository);
    this._fetchClientById = new FetchClientByIdService(this._clientRepository);
  }

  async registerClient(req: Request, res: Response, next: NextFunction) {
    try {
      const clientData = req.body as TCreationClientDTO;
      await this._createClientService.execute(clientData);
      return res.status(201).json({ message: 'Client created successfully' });
    } catch (err) {
      next(err);
    }
  }

  async findClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientId } = req.params;
      const client = await this._fetchClientById.execute(clientId);
      return res.status(200).json(client);
    } catch (err) {
      next(err);
    }
  }
}