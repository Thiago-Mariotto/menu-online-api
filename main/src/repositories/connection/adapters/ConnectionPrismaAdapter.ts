import { PrismaClient } from '@prisma/client';
import IConnection from '../IConnection';

export default class ConnectionPrismaAdapter implements IConnection<PrismaClient> {
  private static _connection: PrismaClient;

  constructor() {
    if (!ConnectionPrismaAdapter._connection) {
      ConnectionPrismaAdapter._connection = new PrismaClient();
    }
  }

  public getConnection(): PrismaClient {
    return ConnectionPrismaAdapter._connection;
  }
}