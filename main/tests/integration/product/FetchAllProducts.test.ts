import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validCategory, validCategory2 } from '../../mocks/category.mock';

describe('# Integration - Category - Find All', function () {
  test('should be possible list all categories', async function () {
    const categories = [
      validCategory,
      validCategory2
    ];

    for (const category of categories) {
      await requester(app)
        .post('/api/categories')
        .send(category);
    }

    const response = await requester(app)
      .get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});