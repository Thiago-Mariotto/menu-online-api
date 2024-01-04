import { TCreatedPayment } from '../../types/Payment';

interface IPaymentRepository {
  getAll(): Promise<TCreatedPayment[] | []>;
  getById(id: string): Promise<TCreatedPayment | null>;
}

export default IPaymentRepository;