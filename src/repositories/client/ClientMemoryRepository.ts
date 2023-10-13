import { v4 as uuid } from 'uuid';
import Client from '../../entities/Client';
import { TCreatedClient } from '../../types/Client';
import IClientRepository from './IClientRepository';

export default class ClientMemoryRepository implements IClientRepository {
  private _table: TCreatedClient[];

  constructor() {
    this._table = [];
  }

  async findByEmail(email: string): Promise<TCreatedClient | null> {
    return this._table.find(client => client.email === email) || null;
  }

  async findById(id: string): Promise<TCreatedClient | null> {
    return this._table.find(client => client.clientId === id) || null;
  }

  public async save(client: Client): Promise<TCreatedClient> {
    const clientId = uuid();

    const newClient = {
      clientId,
      name: client.name.value,
      phone: client.phone,
      email: client.email.value,
    };

    this._table.push();
    return newClient;
  }
}