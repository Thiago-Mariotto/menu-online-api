import Client from '../../entities/Client';
import { TCreatedClient } from '../../types/Client';

interface IClientRepository {
  save(data: Client): Promise<TCreatedClient>;
  findByEmail(email: string): Promise<TCreatedClient | null>;
  findById(id: string): Promise<TCreatedClient | null>;
}

export default IClientRepository;