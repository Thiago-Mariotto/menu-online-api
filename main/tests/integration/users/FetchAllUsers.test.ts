import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validUser, validUser2 } from '../../mocks/user.mock';

describe('# Integration - User - Find All', function () {
  test('should be possible find all users', async function () {
    const users = [
      { ...validUser },
      { ...validUser2 }
    ]

    users.forEach(async (user) => {
      await requester(app)
        .post('/api/users')
        .send(user);
    });

    const fetchUsers = await requester(app)
      .get('/api/users');

    expect(fetchUsers.status).toBe(200);
    expect(fetchUsers.body).toHaveLength(2);
  })
});