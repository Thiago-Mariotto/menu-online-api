import Address from './Address';
import AuthenticatableUser from './AuthenticableUser';
import UserBuilder from './UserBuilder';
import CNPJ from './valueObjects/CNPJ';
import Email from './valueObjects/Email';
import Name from './valueObjects/Name';
import Password from './valueObjects/Password';

export default class User {
  private _id?: string;
  private _name: Name;
  private _authenticableUser: AuthenticatableUser;
  private _role: string;
  private _phone: string;
  private _cnpj: CNPJ;
  private _createdAt: Date;
  private _address: Address;

  constructor(builder: UserBuilder) {
    this._name = builder.name;
    this._phone = builder.phone;
    this._cnpj = builder.cnpj;
    this._authenticableUser = new AuthenticatableUser(builder);
    this._address = new Address(builder);
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

  get addressId(): string | undefined {
    return this._address.id;
  }

  set addressId(id: string | undefined) {
    this._address.id = id;
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

  get role(): string {
    return this._role;
  }

  get phone(): string {
    return this._phone;
  }

  get cnpj(): CNPJ {
    return this._cnpj;
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

  get cep(): string {
    return this._address.cep;
  }

  get number(): string {
    return this._address.number;
  }

  get complement(): string {
    return this._address.complement;
  }

  set cep(cep: string) {
    this._address.cep = cep;
  }

  set number(number: string) {
    this._address.number = number;
  }

  set complement(complement: string) {
    this._address.complement = complement;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set role(role: string) {
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