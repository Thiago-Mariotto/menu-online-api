import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { TCreatedPayment } from '../../types/Payment';
import PaymentRepository from './IPaymentRespository';

export default class PaymentPrismaRepository implements PaymentRepository {
  private _prisma: PrismaClient;
  private _paymentModel: Prisma.PaymentModelDelegate<DefaultArgs>;

  constructor() {
    this._prisma = new PrismaClient();
    this._paymentModel = this._prisma.paymentModel;
  }

  getAll(): Promise<TCreatedPayment[] | []> {
    return this._paymentModel.findMany();
  }

  getById(paymentId: string): Promise<TCreatedPayment | null> {
    return this._paymentModel.findUnique({ where: { paymentId } }) || null;
  }
}