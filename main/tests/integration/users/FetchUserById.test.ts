import requester from 'supertest';
import app from '../../../src/infra/web/express/app';

describe('# Integration - User - Find', function () {
  test('should be possible find one user by id', async function () {
    const newUser = await requester(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234Abc##',
        cpf: '027.272.310-08',
      });

    const { userId } = newUser.body;

    const response = await requester(app)
      .get(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId');
    expect(response.body.userId).toBe(userId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('cpf');
  });

  test('should not be possible find one user by inexisting id', async function () {
    const userId = 'badddca4-e93e-4e04-9c11-07d9f16d7106';
    const response = await requester(app)
      .get(`/api/users/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`User with id ${userId} not found`);
  });
});