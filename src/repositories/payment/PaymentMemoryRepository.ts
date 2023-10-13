import PaymentRepository from '../../entities/repositories/PaymentRespository';
import { TCreatedPayment } from '../../types/Payment';

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