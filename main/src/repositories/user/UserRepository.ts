import User from '../../entities/User';
import { TUserCreated } from '../../types/User';

interface IUserRepository {
  getAll(): Promise<TUserCreated[] | []>;
  getById(id: string): Promise<TUserCreated | null>;
  getByEmail(email: string): Promise<TUserCreated | null>;
  getByCPF(cpf: string): Promise<TUserCreated | null>;
  save(user: User): Promise<TUserCreated>;
}

export default IUserRepository;