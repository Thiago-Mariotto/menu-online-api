export type TCreationStoreDTO = {
  name: string;
  cnpj: string;
  phone: string;
  userId: string;
  cep: string;
  number: string;
  complement?: string;
}

export type TStoreCreated = {
  storeId: string;
  name: string;
  cnpj: string;
  phone: string;
  userId: string;
  storeAddressId: string;
  active: boolean;
}