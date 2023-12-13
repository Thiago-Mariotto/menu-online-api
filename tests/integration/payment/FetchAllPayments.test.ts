import requester from 'supertest';
import app from '../../../src/infra/web/express/app';

describe('# Integration - Payment - FetchAll', function () {
  test('should be possible fetch all payments', async function () {
    const payments = await requester(app)
      .get('/api/payments');

    expect(payments.status).toBe(200);
    expect(payments.body).toHaveLength(1);
  });
});