import BadRequest from '../../errors/BadRequest';

export default class Phone {
  private _phone: string;

  constructor(phone: string) {
    this._phone = phone;
  }

  public get value(): string {
    return this._phone;
  }

  static fromString(phone: string): Phone {
    if (!phone) throw new BadRequest('Telefone é obrigatório');
    if (!Phone.isValid(phone)) throw new BadRequest('Telefone inválido');
    return new Phone(phone);
  }

  static isValid(phone: string): boolean {
    return phone ? true : false;
  }
}