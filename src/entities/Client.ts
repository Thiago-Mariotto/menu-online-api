import Email from './valueObjects/Email';
import Name from './valueObjects/Name';

export default class Client {
  private _id?: string;
  private _name: Name;
  private _email: Email;
  private _phone: string;

  constructor(name: string, phone: string, email: string) {
    this._name = Name.fromString(name);
    this._phone = phone;
    this._email = Email.fromString(email);
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  set id(id: string) {
    if (this._id) {
      return;
    }
    this._id = id;
  }

  set name(name: string) {
    this._name = Name.fromString(name);
  }

  set email(email: string) {
    this._email = Email.fromString(email);
  }

  set phone(phone: string) {
    this._phone = phone;
  }
}