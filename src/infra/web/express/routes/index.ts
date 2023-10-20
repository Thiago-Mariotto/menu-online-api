import { Router } from 'express';
import addressRouter from './address.route';
import clientRouter from './client.route';
import userRouter from './user.route';

const router = Router();
router.use('/addresses', addressRouter);
router.use('/users', userRouter);
router.use('/clients', clientRouter);

export default router;