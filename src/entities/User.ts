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
  private _addressId: string;
  private _phone: string;
  private _cnpj: CNPJ;
  private _createdAt: Date;
  private _lastLogin: Date;

  constructor(builder: UserBuilder) {
    this._name = builder.name;
    this._phone = builder.phone;
    this._cnpj = builder.cnpj;
    this._addressId = builder.addressId;
    this._authenticableUser = new AuthenticatableUser(builder);
    this._role = 'user';
    this._createdAt = new Date();
    this._lastLogin = new Date();
  }

  get id(): string | undefined {
    if (this._id) {
      return this._id;
    }
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

  get addressId(): string {
    return this._addressId;
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
    return this._lastLogin;
  }

  get active(): boolean {
    return this._authenticableUser.active;
  }

  public setPhone(phone: string): void {
    this._phone = phone;
  }

  public setAddressId(addressId: string): void {
    this._addressId = addressId;
  }

  public setCnpj(cnpj: string): void {
    this._cnpj = CNPJ.fromString(cnpj);
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

const user = new UserBuilder('88.495.051/0001-82')
  .setAddressId('123')
  .setEmail('jonh@mail.com')
  .setName('Jon')
  .setPassword('123Abdrc#')
  .setPhone('123')
  .build();

// console.log(user);

console.log(user.email);