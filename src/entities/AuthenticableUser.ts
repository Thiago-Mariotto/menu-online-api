import UserBuilder from './UserBuilder';
import Email from './valueObjects/Email';
import Password from './valueObjects/Password';

export default class AuthenticableUser {
  private _email: Email;
  private _password: Password;
  private _lastLogin: Date;
  private _active: boolean;

  constructor(builder: UserBuilder) {
    this._email = Email.fromString(builder.email.value);
    this._password = Password.fromString(builder.password.value);
    this._lastLogin = new Date();
    this._active = true;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  get lastLogin(): Date {
    return this._lastLogin;
  }

  get active(): boolean {
    return this._active;
  }

  set lastLogin(date: Date) {
    this._lastLogin = date;
  }

  set active(active: boolean) {
    this._active = active;
  }

  set password(password: Password) {
    this._password = password;
  }

  set email(email: Email) {
    this._email = email;
  }
}