import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validUser } from '../../mocks/user.mock';

describe('# Integration - User - Create', function () {
  test('should be possible register a new user', async function () {
    const response = await requester(app)
      .post('/api/users')
      .send(validUser)

    expect(response.status).toBe(201);
  });

  test('should not be possible register a new user with invalid email', async function () {
    const response = await requester(app)
      .post('/api/users')
      .send({ ...validUser, email: 'invalid-email' })
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Email');
  });

  test('should not be possible register a new user with invalid password', async function () {
    const response = await requester(app)
      .post('/api/users')
      .send({ ...validUser, password: '123' })

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Password');
  });

  test('should not be possible register a new user with invalid name', async function () {
    const response = await requester(app)
      .post('/api/users')
      .send({ ...validUser, name: 'a' })

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Name');
  });

  test('should not be possible register a new user with invalid cpf', async function () {
    const response = await requester(app)
      .post('/api/users')
      .send({ ...validUser, cpf: '123' })

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid CPF');
  });

  test('should not be possible register a new user with email already registered', async function () {
    await requester(app)
      .post('/api/users')
      .send(validUser);

    const response = await requester(app)
      .post('/api/users')
      .send({ ...validUser, cpf: '027.272.310-08' })

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Email already registered');
  });

  test('should not be possible register a new user with cpf already registered', async function () {
    await requester(app)
      .post('/api/users')
      .send(validUser);

    const response = await requester(app)
      .post('/api/users')
      .send({ ...validUser, email: 'john2@mail.com' });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('CPF already registered');
  });
});