import IPaymentRepository from '../../repositories/payment/IPaymentRespository';
import { TCreatedPayment } from '../../types/Payment';
import { IService } from '../IService';

export default class FetchAllPaymentsService implements IService<never, TCreatedPayment[]> {
  private _paymentRepository: IPaymentRepository;

  constructor(paymentRepository: IPaymentRepository) {
    this._paymentRepository = paymentRepository;
  }

  public async execute() {
    const payments = await this._paymentRepository.getAll();
    return payments;
  }
}