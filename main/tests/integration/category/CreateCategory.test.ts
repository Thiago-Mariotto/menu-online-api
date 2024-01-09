import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validCategory } from '../../mocks/category.mock';

describe('# Integration - Category - Create', function () {
  test('should be possible create a category', async function () {
    const response = await requester(app)
      .post('/api/categories')
      .send(validCategory);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Category created successfully');
  });

  test('should not be possible create a category without name', async function () {
    const response = await requester(app)
      .post('/api/categories')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Category is required');
  });

  test('should not be possible create a category if name contains special characters', async function () {
    const response = await requester(app)
      .post('/api/categories')
      .send({ name: 'Bebid@s' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Invalid Category');
  });

  test('should not be possible create a category if name contains numbers', async function () {
    const response = await requester(app)
      .post('/api/categories')
      .send({ name: 'Bebidas 1' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Invalid Category');
  });

  test('should not be possible create a category with invalid name', async function () {
    const response = await requester(app)
      .post('/api/categories')
      .send({ name: 'a' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Invalid Category');
  });

  test('should not be possible create a category with name already in use', async function () {
    await requester(app)
      .post('/api/categories')
      .send(validCategory);

    const response = await requester(app)
      .post('/api/categories')
      .send(validCategory);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Category already exists');
  });
});