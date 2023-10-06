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
  cep!: string;
  street!: string;
  number!: string;
  complement!: string;

  constructor(cnpj: string) {
    this.cnpj = CNPJ.fromString(cnpj);
  }

  setName(name: string) {
    this.name = Name.fromString(name);
    return this;
  }

  setEmail(email: string) {
    this.email = Email.fromString(email);
    return this;
  }

  setPassword(password: string) {
    this.password = Password.fromString(password);
    return this;
  }

  setPhone(phone: string) {
    this.phone = phone;
    return this;
  }

  setCep(cep: string) {
    this.cep = cep;
    return this;
  }

  setStreet(street: string) {
    this.street = street;
    return this;
  }

  setNumber(number: string) {
    this.number = number;
    return this;
  }

  setComplement(complement: string) {
    this.complement = complement;
    return this;
  }

  build(): User {
    return new User(this);
  }
}