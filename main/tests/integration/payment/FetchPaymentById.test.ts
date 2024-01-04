import requester from 'supertest';
import app from '../../../src/infra/web/express/app';

describe('# Integration - Payment - FetchById', function () {
  test('should be possible fetch payment by id', async function () {
    const idFromRepository = 'a83e17c0-d3b8-455b-832a-324e2bc5cdc3'
    const response = await requester(app)
      .get(`/api/payments/${idFromRepository}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('paymentId');
    expect(response.body.paymentId).toBe(idFromRepository);
  });

  test('should not be possible fetch payment by id if payment not exists', async function () {
    const payment = await requester(app)
      .get(`/api/payments/123`);

    expect(payment.status).toBe(404);
    expect(payment.body).toHaveProperty('message');
    expect(payment.body.message).toBe(`Payment not found`);
  });
});