export type TCreationUserDTO = {
  cpf: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export type TCreationUserInputData = {
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

export type TUserCreated = {
  userId: string,
  cpf: string,
  name: string,
  email: string,
  password: string,
  role: string,
  active: true | false,
  lastLogin: Date,
  createdAt: Date,
  phone: string
}