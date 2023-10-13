import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import Client from '../../../entities/Client';
import { TCreatedClient } from '../../../types/Client';
import IClientRepository from '../IClientRepository';

export default class ClientPrismaRepository implements IClientRepository {
  private _prisma: PrismaClient;
  private _clientModel: Prisma.ClientModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new PrismaClient();
    this._clientModel = this._prisma.clientModel;
  }

  async save(data: Client): Promise<TCreatedClient> {
    return this._clientModel.create({
      data: {
        name: data.name.value,
        phone: data.phone,
        email: data.email.value,
      }
    });
  }

  async findByEmail(email: string): Promise<TCreatedClient | null> {
    return this._clientModel.findUnique({
      where: {
        email
      }
    });
  }

  async findById(clientId: string): Promise<TCreatedClient | null> {
    return this._clientModel.findUnique({
      where: {
        clientId
      }
    });
  }
}