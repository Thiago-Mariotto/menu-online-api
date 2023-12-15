import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validStore } from '../../mocks/store.mock';
import { validUser } from '../../mocks/user.mock';

describe('# Integration - Store - Get Store By Id', function () {
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

    // set authorization token
    authorization = loggedUser.body.token;

    // register new store
    await requester(app)
      .post('/api/stores')
      .set('Authorization', authorization)
      .send(validStore);
  });

  test('should be possible get stores by id', async function () {
    const userStores = await requester(app)
      .get(`/api/stores/user/${userId}`)
      .set('Authorization', authorization);

    const response = await requester(app)
      .get(`/api/stores/${userStores.body[0].storeId}`)
      .set('Authorization', authorization);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(validStore.name);
    expect(response.body.cnpj).toBe(validStore.cnpj);
  });
});