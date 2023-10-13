import { TCreationUserDTO, TUserCreated } from '../../src/types/User';

export const validUser: TCreationUserDTO = {
  cpf: '439.333.610-01',
  name: 'John Doe',
  email: 'john@mail.com',
  password: '12345Abcd##',
  phone: '(11) 99999-9999'
}

export const userFromDatabase: TUserCreated = {
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

export const usersFromDatabase: TUserCreated[] = [
  {
    userId: '96c1b233-7a87-4c40-979f-cca7acc6d4b8',
    cpf: '439.333.610-01',
    name: 'John Doe',
    email: 'joh@mail.com',
    phone: '(11) 99999-9999',
    password: '12345Abcd##',
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'user'
  },
  {
    userId: '64f8535d-51ef-42cd-a6df-686d4f9d328d',
    cpf: '055.970.350-37',
    name: 'Ada Lovelace',
    email: 'ada@mail.com',
    password: '12345Abcd##',
    phone: '(12) 87711-1516',
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'user'
  },
]