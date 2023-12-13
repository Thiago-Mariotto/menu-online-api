import BadRequest from '../errors/BadRequest';
import AuthenticatableUser from './AuthenticableUser';
import UserBuilder from './UserBuilder';
import CPF from './valueObjects/CPF';
import Email from './valueObjects/Email';
import Name from './valueObjects/Name';
import Password from './valueObjects/Password';

export default class User {
  private _id?: string;
  private _name: Name;
  private _authenticableUser: AuthenticatableUser;
  private _role: 'admin' | 'user';
  private _phone: string;
  private _cpf: CPF;
  private _createdAt: Date;

  constructor(builder: UserBuilder) {
    this._name = builder.name;
    this._phone = builder.phone;
    this._cpf = builder.cpf;
    this._authenticableUser = new AuthenticatableUser(builder);
    this._role = 'user';
    this._createdAt = new Date();
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string) {
    if (this._id) {
      return;
    }
    this._id = id;
  }

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._authenticableUser.email;
  }

  get password(): Password {
    return this._authenticableUser.password;
  }

  get role(): 'admin' | 'user' {
    return this._role;
  }

  get phone(): string {
    return this._phone;
  }

  get cpf(): CPF {
    return this._cpf;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get lastLogin(): Date {
    return this._authenticableUser.lastLogin;
  }

  get active(): boolean {
    return this._authenticableUser.active;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set role(role: string) {
    if (role !== 'admin' && role !== 'user') {
      throw new BadRequest('Invalid role');
    }
    this._role = role;
  }

  set name(name: string) {
    this._name = Name.fromString(name);
  }

  set email(email: string) {
    this._authenticableUser.email = Email.fromString(email);
  }

  set password(password: string) {
    this._authenticableUser.password = Password.fromString(password);
  }

  set lastLogin(date: Date) {
    this._authenticableUser.lastLogin = date;
  }

  set active(active: boolean) {
    this._authenticableUser.active = active;
  }
}