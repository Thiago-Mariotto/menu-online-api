import User from './User';
import CNPJ from './valueObjects/CNPJ';
import Email from './valueObjects/Email';
import Name from './valueObjects/Name';
import Password from './valueObjects/Password';

export default class UserBuilder {
  name!: Name;
  email!: Email;
  password!: Password;
  phone!: string;
  cnpj: CNPJ;
  addressId!: string;

  constructor(cnpj: string) {
    this.cnpj = CNPJ.fromString(cnpj);
  }

  setName(name: string): UserBuilder {
    this.name = Name.fromString(name);
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.email = Email.fromString(email);
    return this;
  }

  setPassword(password: string): UserBuilder {
    this.password = Password.fromString(password);
    return this;
  }

  setCnpj(cnpj: string): UserBuilder {
    this.cnpj = CNPJ.fromString(cnpj);
    return this;
  }

  setPhone(phone: string): UserBuilder {
    this.phone = phone;
    return this;
  }

  setAddressId(addressId: string): UserBuilder {
    this.addressId = addressId;
    return this;
  }

  build(): User {
    return new User(this);
  }
}