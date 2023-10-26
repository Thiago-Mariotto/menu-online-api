import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validCategory } from '../../mocks/category.mock';

describe('# Integration - Category - Find By Id', function () {
  test('should be possible list category by id', async function () {
    const newCategory = await requester(app)
      .post('/api/categories')
      .send(validCategory);

    const { categoryId } = newCategory.body;

    const response = await requester(app)
      .get(`/api/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('categoryId');
    expect(response.body.categoryId).toEqual(categoryId);
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toEqual(validCategory.name);
  });

  test('should not be possible list category by id if category not exists', async function () {
    const categoryId = '1234';
    const response = await requester(app)
      .get(`/api/categories/${categoryId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Category with id 1234 not found');
  });
});