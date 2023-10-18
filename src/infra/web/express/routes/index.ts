import { Router } from 'express';
import addressRouter from './address.route';
import userRouter from './user.route';

const router = Router();
router.use('/addresses', addressRouter);
router.use('/users', userRouter);

export default router;

