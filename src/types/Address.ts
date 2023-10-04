export type ViaCepAddress = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export type District = {
  districtId: string;
  name: string;
  cityId: string;
}