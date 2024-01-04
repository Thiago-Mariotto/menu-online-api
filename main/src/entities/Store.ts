import StoreBuilder from './StoreBuilder';
import CNPJ from './valueObjects/CNPJ';
import Phone from './valueObjects/Phone';
import StoreName from './valueObjects/StoreName';

export default class Store {
  private _id?: string;
  private _name: StoreName;
  private _cnpj: CNPJ;
  private _phone: Phone;
  private _cep: string;
  private _userId: string;
  private _storeAddressId: string;

  constructor(storeBuilder: StoreBuilder) {
    this._name = StoreName.fromString(storeBuilder.name);
    this._cnpj = storeBuilder.cnpj;
    this._phone = Phone.fromString(storeBuilder.phone);
    this._cep = this.validateCEP(storeBuilder.cep);
    this._userId = storeBuilder.userId;
    this._storeAddressId = storeBuilder.storeAddressId;
  }

  private validateCEP(cep: string) {
    if (!cep) throw new Error('CEP é obrigatório');
    return cep;
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name.value;
  }

  get cnpj(): CNPJ {
    return this._cnpj;
  }

  get phone(): string {
    return this._phone.value;
  }

  get userId(): string {
    return this._userId;
  }

  get cep(): string {
    return this._cep;
  }

  set cep(cep: string) {
    this._cep = this.validateCEP(cep);
  }

  set name(name: string) {
    this._name = StoreName.fromString(name);
  }

  set phone(phone: string) {
    this._phone = Phone.fromString(phone);
  }

  get addressId(): string {
    return this._storeAddressId;
  }
}