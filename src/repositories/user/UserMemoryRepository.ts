import { v4 as uuid } from 'uuid';
import User from '../../entities/User';
import UserRepository from '../../entities/repositories/UserRepository';
import { TUserCreated } from '../../types/User';

export default class UserMemoryRepository implements UserRepository {
  private _userDb: TUserCreated[];

  constructor() {
    this._userDb = [];
  }

  public async getAll(): Promise<TUserCreated[] | []> {
    return this._userDb;
  }

  public async getById(userId: string): Promise<TUserCreated | null> {
    return this._userDb.find(user => user.userId === userId) || null;
  }

  public async getByEmail(email: string): Promise<TUserCreated | null> {
    return this._userDb.find(user => user.email === email) || null;
  }

  public async getByCPF(cpf: string): Promise<TUserCreated | null> {
    return this._userDb.find(user => user.cpf === cpf) || null;
  }

  public async save(user: User): Promise<TUserCreated> {
    const userId = uuid();
    const newUser = {
      userId: userId,
      cpf: user.cpf.value,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      role: user.role,
      phone: user.phone,
      active: user.active,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt
    };

    this._userDb.push(newUser);
    return newUser;
  }
}