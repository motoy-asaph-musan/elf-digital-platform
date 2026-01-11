import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';

@Injectable()
export class VisaProvider {
  initiate(payment: Payment) {
    return {
      message: 'Visa payment initiated',
      reference: payment.reference,
    };
  }
}
