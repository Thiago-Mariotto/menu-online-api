import { NextFunction, Request, Response, Router } from 'express';
import PaymentMemoryRepository from '../../../../repositories/payment/adapters/PaymentMemoryRepository';
import PaymentPrismaRepository from '../../../../repositories/payment/adapters/PaymentPrismaRepository';
import FetchAllPaymentsService from '../../../../services/payment/FetchAllPayments.service';
import FetchPaymentByIdService from '../../../../services/payment/FetchPaymentById.service';
import PaymentController from '../controllers/payment/adapters/PaymentController';

const NODE_ENV = process.env.NODE_ENV || 'development';
const paymentRepository = NODE_ENV === 'test' || NODE_ENV === 'development' ?
  new PaymentMemoryRepository() : new PaymentPrismaRepository();

const fetchAllPaymentsService = new FetchAllPaymentsService(paymentRepository);
const fetchPaymentByIdService = new FetchPaymentByIdService(paymentRepository);

const paymentRouter = Router();
const paymentController = new PaymentController(fetchAllPaymentsService, fetchPaymentByIdService);

paymentRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  paymentController.listPayments(req, res, next));

paymentRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  paymentController.findPayment(req, res, next));

export default paymentRouter;