export type UserRegisterDTO = {
  cpf: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export type TUserInputData = {
  cpf: string,
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'user',
  active: true | false,
  lastLogin: Date,
  createdAt: Date,
  phone: string
}