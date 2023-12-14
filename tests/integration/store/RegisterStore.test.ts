import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validStore } from '../../mocks/store.mock';
import { validUser } from '../../mocks/user.mock';

describe('# Integration - Store - Create', function () {
  let authorization: string;
  let userId: string;

  beforeEach(async function () {
    const newUser = await requester(app)
      .post('/api/users')
      .send(validUser);
    userId = newUser.body.userId;

    const loggedUser = await requester(app)
      .post('/api/users/login')
      .send({
        email: validUser.email,
        password: validUser.password
      });
    authorization = loggedUser.body.token;
  });

  test('should be possible create a store', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, userId })

    expect(newStore.status).toBe(201);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('Loja cadastrada com sucesso');
  });

  test('should not be possible create a store without authorization', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .send({ ...validStore, userId })

    expect(newStore.status).toBe(401);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('Token inválido');
  });

  test('should not be possible create a store with invalid token', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', 'INVALID_TOKEN')
      .send({ ...validStore, userId })

    expect(newStore.status).toBe(401);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('Token inválido');
  });

  test('should not be possible create a store with invalid name', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, name: '' })

    expect(newStore.status).toBe(409);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('O campo nome é obrigatório');
  });

  test('should not be possible create a store without cnpj', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, cnpj: '' })

    expect(newStore.status).toBe(409);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('Erro ao cadastrar loja');
  });

  test('should not be possible create a store with invalid cnpj', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, cnpj: '12.132.133/0001-39' })

    expect(newStore.status).toBe(409);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('Erro ao cadastrar loja');
  });

  test('should not be possible create a store without cep', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, cep: '' })

    expect(newStore.status).toBe(404);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('CEP não encontrado');
  });

  test('should not be possible create a store with invalid cep', async function () {
    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, cep: '12345678' })

    expect(newStore.status).toBe(404);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('CEP não encontrado');
  });

  test('should not be possible create a store with cpnj already registered', async function () {
    await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, userId })

    const newStore = await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send({ ...validStore, userId })

    expect(newStore.status).toBe(409);
    expect(newStore.body).toHaveProperty('message');
    expect(newStore.body.message).toBe('CNPJ já cadastrado');
  });
});