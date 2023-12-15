import BadRequest from '../errors/BadRequest';
import Store from './Store';
import CNPJ from './valueObjects/CNPJ';

export default class StoreBuilder {
  name!: string;
  cnpj!: CNPJ;
  phone!: string;
  userId!: string;
  cep!: string;
  storeAddressId!: string;

  constructor(cnpj: string) {
    this.cnpj = CNPJ.fromString(cnpj);
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setPhone(phone: string) {
    this.phone = phone;
    return this;
  }

  setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  setCep(cep: string) {
    if (!cep) throw new BadRequest('CEP é obrigatório');
    this.cep = cep;
    return this;
  }

  setStoreAddressId(storeAddressId: string) {
    this.storeAddressId = storeAddressId;
    return this;
  }

  build(): Store {
    return new Store(this);
  }
}