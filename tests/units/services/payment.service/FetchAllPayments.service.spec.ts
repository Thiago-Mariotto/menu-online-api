import PaymentMemoryRepository from '../../../../src/repositories/payment/adapters/PaymentMemoryRepository';
import FetchAllPaymentsService from '../../../../src/services/payment/FetchAllPayments.service';
import { paymentsFromDb } from '../../../mocks/payment.mock';

describe('# Unit - Service => FetchAllPayments', function () {
  let fetchAllPaymentsService: FetchAllPaymentsService;
  let paymentRepository: PaymentMemoryRepository;

  beforeEach(() => {
    paymentRepository = new PaymentMemoryRepository();
    fetchAllPaymentsService = new FetchAllPaymentsService(paymentRepository);
  });

  test('should return a list of payments', async function () {
    paymentRepository.getAll = jest.fn().mockReturnValueOnce(paymentsFromDb);
    const payments = await fetchAllPaymentsService.execute();
    expect(payments).toHaveLength(4);
  });

  test('should return an empty list', async function () {
    paymentRepository.getAll = jest.fn().mockReturnValueOnce([]);
    const payments = await fetchAllPaymentsService.execute();
    expect(payments).toHaveLength(0);
  });
});