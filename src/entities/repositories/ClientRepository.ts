import { TCreatedClient } from '../../types/Client';
import Client from '../Client';

interface IClientRepository {
  create(data: Client): Promise<TCreatedClient>;
  findByEmail(email: string): Promise<TCreatedClient>;
  findById(id: string): Promise<TCreatedClient>;
}

export default IClientRepository;