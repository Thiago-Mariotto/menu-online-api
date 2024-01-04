import { TCreatedPayment } from '../../../types/Payment';
import PaymentRepository from '../IPaymentRespository';

export default class PaymentMemoryRepository implements PaymentRepository {
  private _table: TCreatedPayment[];

  constructor() {
    this._table = [];
    this._table.push({
      paymentId: 'a83e17c0-d3b8-455b-832a-324e2bc5cdc3',
      name: 'Cartão de Crédito'
    });
  }


  public async getAll(): Promise<TCreatedPayment[] | []> {
    return this._table;
  }

  public async getById(paymentId: string): Promise<TCreatedPayment | null> {
    return this._table.find(payment => payment.paymentId === paymentId) || null;
  }
}