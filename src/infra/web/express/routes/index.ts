import { Router } from 'express';
import addressRouter from './address.route';
import categoryRouter from './category.route';
import clientRouter from './client.route';
import paymentRouter from './payment.route';
import userRouter from './user.route';

const router = Router();

router.use('/addresses', addressRouter);
router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/categories', categoryRouter);
router.use('/payments', paymentRouter);

export default router;