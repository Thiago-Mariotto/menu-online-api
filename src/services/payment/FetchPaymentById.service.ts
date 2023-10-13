import IPaymentRepository from '../../entities/repositories/PaymentRespository';
import NotFound from '../../errors/NotFound';
import { TCreatedPayment } from '../../types/Payment';
import { IService } from '../IService';

export default class FetchPaymentByIdService implements IService<string, TCreatedPayment> {
  private _paymentRepository: IPaymentRepository;

  constructor(paymentRepository: IPaymentRepository) {
    this._paymentRepository = paymentRepository;
  }

  public async execute(paymentId: string) {
    const payment = await this._paymentRepository.getById(paymentId);
    if (!payment) throw new NotFound('Payment not found');
    return payment;
  }
}