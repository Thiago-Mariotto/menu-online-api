export type TViaCepAddress = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export type TInputAddress = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  districtId: string;
  userId: string;
}

export type TDistrictInput = {
  name: string;
  cityId: string;
}