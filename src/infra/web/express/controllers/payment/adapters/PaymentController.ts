import { NextFunction, Request, Response } from 'express';
import IPaymentRepository from '../../../../../../repositories/payment/IPaymentRespository';
import PaymentMemoryRepository from '../../../../../../repositories/payment/adapters/PaymentMemoryRepository';
import FetchAllPaymentsService from '../../../../../../services/payment/FetchAllPayments.service';
import FetchPaymentByIdService from '../../../../../../services/payment/FetchPaymentById.service';

export default class PaymentController {
  private _paymentRepository: IPaymentRepository;
  private _fetchPaymentByIdService: FetchPaymentByIdService;
  private _fetchAllPaymentsService: FetchAllPaymentsService;

  constructor() {
    this._paymentRepository = new PaymentMemoryRepository();
    this._fetchPaymentByIdService = new FetchPaymentByIdService(this._paymentRepository);
    this._fetchAllPaymentsService = new FetchAllPaymentsService(this._paymentRepository);
  }

  async listPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await this._fetchAllPaymentsService.execute();
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }

  async findPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payment = await this._fetchPaymentByIdService.execute(id);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
}