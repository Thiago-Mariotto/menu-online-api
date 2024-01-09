import { Router } from 'express';
import categoryRouter from './category.route';
import clientRouter from './client.route';
import paymentRouter from './payment.route';
import storeRouter from './store.route';
import userRouter from './user.route';
import productRouter from './product.route';

const router = Router();

// router.use('/addresses', addressRouter);
router.get('/health', (_req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/categories', categoryRouter);
router.use('/payments', paymentRouter);
router.use('/stores', storeRouter);
router.use('/products', productRouter);

export default router;