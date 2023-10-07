export type TViaCepAddress = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export type TOutputApiServiceAddress = {
  cep: string;
  street: string;
  districtName: string;
  cityName: string;
  stateName: string;
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