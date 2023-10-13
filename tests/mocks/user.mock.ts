import { UserModel } from '@prisma/client';
import { TUserRegisterDTO } from '../../src/types/User';

export const validUser: TUserRegisterDTO = {
  cpf: '439.333.610-01',
  name: 'John Doe',
  email: 'john@mail.com',
  password: '12345Abcd##',
  phone: '(11) 99999-9999'
}

export const userFromDatabase: UserModel = {
  userId: '96c1b233-7a87-4c40-979f-cca7acc6d4b8',
  cpf: '439.333.610-01',
  name: 'John Doe',
  email: 'john@mail.com',
  password: '12345Abcd##',
  phone: '(11) 99999-9999',
  active: true,
  createdAt: new Date(),
  lastLogin: new Date(),
  role: 'user'
}