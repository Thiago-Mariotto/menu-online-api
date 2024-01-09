import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { userLogin } from '../../mocks/user.mock';

describe('# Integration - User - Login', function () {
  beforeEach(async function () {
    await requester(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234Abc##',
        cpf: '027.272.310-08',
      });
  });

  test('should be possible make login', async function () {
    const response = await requester(app)
      .post('/api/users/login')
      .send(userLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should not be possible make login with invalid email', async function () {
    const response = await requester(app)
      .post('/api/users/login')
      .send({ ...userLogin, email: 'j.com' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email or password invalid');
  });

  test('should not be possible make login with invalid password', async function () {
    const response = await requester(app)
      .post('/api/users/login')
      .send({ ...userLogin, password: '1234' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email or password invalid');
  });

  test('should not be possible make login with invalid email and password', async function () {
    const response = await requester(app)
      .post('/api/users/login')
      .send({ ...userLogin, email: 'j.com', password: '1234' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email or password invalid');
  });

  test('should not be possible make login without email', async function () {
    const response = await requester(app)
      .post('/api/users/login')
      .send({ ...userLogin, email: '' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email or password invalid');
  });

  test('should not be possible make login without password', async function () {
    const response = await requester(app)
      .post('/api/users/login')
      .send({ ...userLogin, password: '' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email or password invalid');
  });
});