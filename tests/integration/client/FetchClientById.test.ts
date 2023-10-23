import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import { validClient } from '../../mocks/client.mock';

describe('# Integration - Client - FetchById', function () {
  test('should be possible fetch client by id', async function () {
    const newClient = await requester(app)
      .post('/api/clients')
      .send(validClient);

    console.log(newClient.body);
    const { clientId } = newClient.body;
    const client = await requester(app)
      .get(`/api/clients/${clientId}`);

    expect(client.status).toBe(200);
    expect(client.body).toHaveProperty('clientId');
    expect(client.body.clientId).toBe(clientId);
    expect(client.body).toHaveProperty('name');
    expect(client.body).toHaveProperty('email');
    expect(client.body).toHaveProperty('phone');
  });

  test('should not be possible fetch client by id if client not exists', async function () {
    const client = await requester(app)
      .get(`/api/clients/123`);

    expect(client.status).toBe(404);
    expect(client.body).toHaveProperty('message');
    expect(client.body.message).toBe(`Client id 123 not found`);
  });
});