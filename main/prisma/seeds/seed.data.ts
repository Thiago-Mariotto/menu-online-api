export const states = [
  {
    stateId: '07e39ce9-ab9a-4a0f-84d4-34a08986411d',
    name: 'São Paulo',
    uf: 'SP'
  },
  {
    stateId: '418be216-e3ea-46c3-865d-9ceaf118d609',
    name: 'Minas Gerais',
    uf: 'MG'
  }
];

export const cities = [
  {
    cityId: '3e564db3-be92-4c88-8eb2-c72be8b2d4fd',
    name: 'São José dos Campos',
    stateId: '07e39ce9-ab9a-4a0f-84d4-34a08986411d'
  },
  {
    cityId: '0059697c-7021-4ba1-97bb-0b7bac157e00',
    name: 'Pindamonhangaba',
    stateId: '07e39ce9-ab9a-4a0f-84d4-34a08986411d'
  },
  {
    cityId: 'bf229619-e990-4a32-bb7b-3283eeca4f14',
    name: 'Belo Horizonte',
    stateId: '418be216-e3ea-46c3-865d-9ceaf118d609'
  }
];

export const districts = [
  {
    districtId: 'b04735a9-3dde-41af-ae23-54ea1fa0f2da',
    name: 'Cidade Nova',
    cityId: '0059697c-7021-4ba1-97bb-0b7bac157e00'
  },
  {
    districtId: '30dfbdeb-3495-4cc2-84be-d7782303f35a',
    name: 'Jardim Satélite',
    cityId: '3e564db3-be92-4c88-8eb2-c72be8b2d4fd'
  }
];

export const users = [
  {
    userId: '6c7fa7d7-9918-4791-b3d2-0fa3a5bcc35a',
    cpf: '457.400.680-37',
    name: 'americanas',
    email: 'ame@mail.com',
    password: '123Abcd##!',
    phone: '128888877777',
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'user',
  },
  {
    userId: 'c70d9017-0518-47c3-a2db-c4cbc545c126',
    cpf: '131.267.870-45',
    name: 'Empresa Teste',
    email: 'empresa@mail.com',
    password: '123Abcd##!',
    phone: '12999999999',
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'admin',
  }
];

export const clients = [
  {
    clientId: '6c7fa7d7-9918-4791-b3d2-0fa3a5bcc35a',
    name: 'John Doe',
    phone: '128888877777',
    email: 'john@mail.com',
    clientAddressId: '614f7214-ddb9-4859-88d0-ffbd113bf6ea',
  },
  {
    clientId: 'c70d9017-0518-47c3-a2db-c4cbc545c126',
    name: 'Ada Lovelace',
    phone: '12999999999',
    email: 'ada@mail.com',
    clientAddressId: 'c2e3e1e4-1c2e-4a8c-9a4c-9b7c5d1a7e7f',
  }
];

export const addresses = [
  {
    addressId: '562d0318-3eb6-4488-ab1b-be4a378e249e',
    cep: '12414-070',
    street: 'Rua Ubatuba',
    districtId: 'b04735a9-3dde-41af-ae23-54ea1fa0f2da'
  },
  {
    addressId: '402341ed-976e-41d1-b18c-1ed17143717e',
    cep: '12231-675',
    street: 'Avenida Cidade Jardim',
    districtId: '30dfbdeb-3495-4cc2-84be-d7782303f35a'
  }
];

export const clientAddresses = [
  {
    clientAddressId: '614f7214-ddb9-4859-88d0-ffbd113bf6ea',
    number: '123',
    complement: 'Casa',
    addressId: '562d0318-3eb6-4488-ab1b-be4a378e249e'
  },
  {
    clientAddressId: 'c2e3e1e4-1c2e-4a8c-9a4c-9b7c5d1a7e7f',
    number: '30',
    complement: 'Apto 11',
    addressId: '402341ed-976e-41d1-b18c-1ed17143717e'
  }
];

export const storeAddresses = [
  {
    storeAddressId: '614f7214-ddb9-4859-88d0-ffbd113bf6ea',
    number: '390',
    complement: 'Galpão',
    addressId: '562d0318-3eb6-4488-ab1b-be4a378e249e'
  },
  {
    storeAddressId: 'c2e3e1e4-1c2e-4a8c-9a4c-9b7c5d1a7e7f',
    number: '100',
    complement: 'N/A',
    addressId: '402341ed-976e-41d1-b18c-1ed17143717e'
  }
];

export const payments = [
  {
    paymentId: 'eced01fb-3db6-4e9a-be81-1969609fe060',
    name: 'Dinheiro'
  },
  {
    paymentId: '86a218cf-0cfe-4a13-b7cd-00ce883c7820',
    name: 'Cartão de Crédito',
  },
  {
    paymentId: '3c3f0f1f-5d6e-4a5d-9a0e-9c4f1c8a7c2a',
    name: 'Cartão de Débito',
  },
  {
    paymentId: 'e5b5c0e1-1d9c-4e0c-8d9c-3f4a1f8e2a4c',
    name: 'Pix',
  },
  {
    paymentId: 'a9f4a9f6-2f7f-4d3b-9e9a-7d2b4a1b9e0c',
    name: 'Boleto',
  },
  {
    paymentId: '658afc7d-2e82-4884-b595-a7ef94d994c9',
    name: 'Cheque',
  },
];

export const categories = [
  {
    categoryId: '3cb5ea67-66a5-49c0-a2a2-a86c8c2b9b37',
    name: 'Pizza',
  },
  {
    categoryId: 'ed3a3417-06fc-4f3b-8b54-94176f222e0a',
    name: 'Bebidas',
  },
  {
    categoryId: '891332ac-2c23-4743-8907-fe9ba09c36f0',
    name: 'Hamburges',
  },
  {
    categoryId: '5144256d-2f11-4af3-a0bf-f1d7ba3c5465',
    name: 'Esfiha'
  }
];
