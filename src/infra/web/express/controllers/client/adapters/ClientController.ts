import { NextFunction, Request, Response } from 'express';
import CreateClientService from '../../../../../../services/client/CreateClient.service';
import FetchClientByIdService from '../../../../../../services/client/FetchClientById.service';
import { TCreationClientDTO } from '../../../../../../types/Client';

export default class ClientController {

  constructor(
    private readonly _createClientService: CreateClientService,
    private readonly _fetchClientById: FetchClientByIdService
  ) { }

  async registerClient(req: Request, res: Response, next: NextFunction) {
    try {
      const clientData = req.body as TCreationClientDTO;
      const { clientId } = await this._createClientService.execute(clientData);
      return res.status(201).json({ clientId, message: 'Client created successfully' });
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