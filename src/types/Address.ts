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
  districtId: string;
}

export type TDistrictInput = {
  name: string;
  cityId: string;
}