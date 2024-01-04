import User from './User';
import CPF from './valueObjects/CPF';
import Email from './valueObjects/Email';
import Name from './valueObjects/Name';
import Password from './valueObjects/Password';

export default class UserBuilder {
  name!: Name;
  email!: Email;
  password!: Password;
  phone!: string;
  cpf: CPF;
  cep!: string;
  street!: string;
  number!: string;
  complement!: string;

  constructor(cpf: string) {
    this.cpf = CPF.fromString(cpf);
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

  build(): User {
    return new User(this);
  }
}