export type UserRegisterDTO = {
  cnpj: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  number: string;
  complement: string;
}

export type TUserInputData = {
  cnpj: string,
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'user',
  active: true | false,
  lastLogin: Date,
  createdAt: Date,
  phone: string
}