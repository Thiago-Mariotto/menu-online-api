import { TCreatedPayment } from '../../types/Payment';
import PaymentRepository from './IPaymentRespository';

export default class PaymentMemoryRepository implements PaymentRepository {
  private _table: TCreatedPayment[];

  constructor() {
    this._table = [];
  }

  public async getAll(): Promise<TCreatedPayment[] | []> {
    return this._table;
  }

  public async getById(paymentId: string): Promise<TCreatedPayment | null> {
    return this._table.find(payment => payment.paymentId === paymentId) || null;
  }
}