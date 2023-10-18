import PaymentMemoryRepository from '../../../../src/repositories/payment/adapters/PaymentMemoryRepository';
import FetchPaymentById from '../../../../src/services/payment/FetchPaymentById.service';
import { paymentsFromDb } from '../../../mocks/payment.mock';

describe('# Unit - Service => FetchPaymentById', function () {
  let fetchPaymentById: FetchPaymentById;
  let paymentRepository: PaymentMemoryRepository;

  beforeEach(() => {
    paymentRepository = new PaymentMemoryRepository();
    fetchPaymentById = new FetchPaymentById(paymentRepository);
  });

  test('should return a list of payments', async function () {
    paymentRepository.getById = jest.fn().mockReturnValueOnce(paymentsFromDb[0]);
    const payments = await fetchPaymentById.execute('946d9620-61ae-4207-a6f4-ed9b68e50713');
    expect(payments).toHaveProperty('paymentId');
    expect(payments).toHaveProperty('name');
    expect(payments.name).toBe('Cartão de crédito');
  });

  test('should return throw error message not found if payment not exists', async function () {
    paymentRepository.getById = jest.fn().mockReturnValueOnce(null);
    await expect(fetchPaymentById.execute('946d9620-61ae-4207-a6f4-ed9b68e50713'))
      .rejects.toThrowError('Payment not found');
  });
});