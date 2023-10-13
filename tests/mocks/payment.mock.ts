import { TCreatedPayment } from "../../src/types/Payment";

// generate 4 uuids in the next lines and replace the paymentId use hardcoded

export const paymentsFromDb: TCreatedPayment[] = [
  {
    paymentId: '946d9620-61ae-4207-a6f4-ed9b68e50713',
    name: 'Cartão de crédito'
  },
  {
    paymentId: '3ddd29fa-9515-4a2d-a8b4-df42428d7605',
    name: 'Cartão de débito'
  },
  {
    paymentId: 'c8e33b25-9970-4320-a180-aa68586a2f85',
    name: 'Dinheiro'
  },
  {
    paymentId: '5ca25529-ce68-4edc-bd87-0a45600bc10c',
    name: 'Pix'
  }
];