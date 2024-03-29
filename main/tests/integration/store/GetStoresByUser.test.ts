import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validStore } from '../../mocks/store.mock';
import { validUser } from '../../mocks/user.mock';

describe('# Integration - Store - Get Stores By User', function () {
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

  test('should be possible get stores by user when have one store', async function () {
    await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send(validStore);

    const response = await requester(app)
      .get(`/api/stores/user/${userId}`)
      .set('Authorization', authorization);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe(validStore.name);
    expect(response.body[0].cnpj).toBe(validStore.cnpj);
  });

  test('should not be possible get stores by user without authorization', async function () {
    const response = await requester(app)
      .get(`/api/stores/user/${userId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Token inválido');
  });

  test('should not be possible get stores by user with invalid token', async function () {
    const response = await requester(app)
      .get(`/api/stores/user/${userId}`)
      .set('Authorization', 'INVALID_TOKEN');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Token inválido');
  });

  test('should not be possible get user stores with another user token', async function () {
    const secondeUser = await requester(app)
      .post('/api/users')
      .send({
        name: 'ada lovelace',
        cpf: '517.226.520-12',
        email: 'ada@lovelace.com',
        password: '12345Abcd##',
        phone: '(11) 99999-1111'
      });

    const secondUserLogin = await requester(app)
      .post('/api/users/login')
      .send({
        email: 'ada@lovelace.com',
        password: validUser.password
      });
    const secondUserToken = secondUserLogin.body.token;

    const response = await requester(app)
      .get(`/api/stores/user/${userId}`)
      .set('Authorization', secondUserToken);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Você não tem permissão para acessar essas informações');
  });
});