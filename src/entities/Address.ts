import UserBuilder from './UserBuilder';

export default class Address {
  private _id?: string;
  private _cep: string;
  private _number: string;
  private _complement: string;
  private _street: string;

  constructor(builder: UserBuilder) {
    this._cep = builder.cep;
    this._number = builder.number;
    this._complement = builder.complement;
    this._street = builder.street;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    if (this._id) {
      return;
    }
    this._id = id;
  }

  get cep(): string {
    return this._cep;
  }

  set cep(cep: string) {
    Address.validateCep(cep);
    this._cep = cep;
  }

  get number(): string {
    return this._number;
  }

  set number(number: string) {
    this._number = number;
  }

  get complement(): string {
    return this._complement;
  }

  set complement(complement: string) {
    this._complement = complement;
  }

  set street(street: string) {
    this._street = street;
  }

  get street(): string {
    return this._street;
  }

  private static validateCep(cep: string): boolean {
    const CEP_MIN_LENGTH = 8;
    const CEP_MAX_LENGTH = 9;
    return cep.length !== CEP_MIN_LENGTH && cep.length !== CEP_MAX_LENGTH;
  }
}