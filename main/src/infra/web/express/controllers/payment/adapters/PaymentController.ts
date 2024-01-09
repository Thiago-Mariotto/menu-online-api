import { NextFunction, Request, Response } from 'express';
import FetchAllPaymentsService from '../../../../../../services/payment/FetchAllPayments.service';
import FetchPaymentByIdService from '../../../../../../services/payment/FetchPaymentById.service';

export default class PaymentController {
  constructor(
    private readonly _fetchAllPaymentsService: FetchAllPaymentsService,
    private readonly _fetchPaymentByIdService: FetchPaymentByIdService,
  ) { }

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