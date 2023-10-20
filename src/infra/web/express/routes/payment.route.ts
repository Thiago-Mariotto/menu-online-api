import { NextFunction, Request, Response, Router } from 'express';
import PaymentController from '../controllers/payment/adapters/PaymentController';

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  paymentController.listPayments(req, res, next));

paymentRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  paymentController.findPayment(req, res, next));

export default paymentRouter;