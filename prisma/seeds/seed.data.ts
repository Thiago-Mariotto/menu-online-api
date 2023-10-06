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
  },
  {
    districtId: 'e39c75e0-cc0d-403d-88eb-7617a58f9140',
    name: 'Pampulha',
    cityId: 'bf229619-e990-4a32-bb7b-3283eeca4f14'
  }
];

export const users = [
  {
    userId: '6c7fa7d7-9918-4791-b3d2-0fa3a5bcc35a',
    cnpj: '89.550.735/0001-00',
    name: 'americanas',
    email: 'ame@mail.com',
    password: '123Abcd##!',
    phone: '128888877777',
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'false',
  },
  {
    userId: 'c70d9017-0518-47c3-a2db-c4cbc545c126',
    cnpj: '29.741.301/0001-58',
    name: 'Empresa Teste',
    email: 'empresa@mail.com',
    password: '123Abcd##!',
    phone: '12999999999',
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'admin',
  }, {
    userId: 'f7bdd5cd-60db-44d8-a606-57ecca86a439',
    cnpj: '86.451.324/0001-61',
    name: 'LOJA SHOPEE',
    email: 'shopee@mail.com',
    password: '123Abcd##!',
    phone: '12999999999',
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    role: 'user',
  }
];

export const addresses = [
  {
    addressId: '614f7214-ddb9-4859-88d0-ffbd113bf6ea',
    cep: '12414070',
    street: 'Rua ubatuba',
    districtId: 'b04735a9-3dde-41af-ae23-54ea1fa0f2da'
  },
  {
    addressId: 'c2e3e1e4-1c2e-4a8c-9a4c-9b7c5d1a7e7f',
    cep: '12230670',
    street: 'Rua Nazaré',
    districtId: '30dfbdeb-3495-4cc2-84be-d7782303f35a'
  },
  {
    addressId: 'e2b9b1d7-2f2e-4f2e-9b5b-6b7c5d1a7e7f',
    cep: '31275973',
    street: 'Avenida Presidente Antônio Carlos',
    userId: 'f7bdd5cd-60db-44d8-a606-57ecca86a439',
    districtId: 'e39c75e0-cc0d-403d-88eb-7617a58f9140'
  }
];
