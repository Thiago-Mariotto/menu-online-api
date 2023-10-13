import { TUserCreated } from '../../types/User';
import User from '../User';

interface UserRepository {
  getAll(): Promise<TUserCreated[] | []>;
  getById(id: string): Promise<TUserCreated | null>;
  getByEmail(email: string): Promise<TUserCreated | null>;
  getByCPF(cpf: string): Promise<TUserCreated | null>;
  save(user: User): Promise<TUserCreated>;
}

export default UserRepository;