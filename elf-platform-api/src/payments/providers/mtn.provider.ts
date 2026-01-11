import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';

@Injectable()
export class MtnProvider {
  initiate(payment: Payment) {
    // Call MTN MoMo API
    return {
      message: 'MTN payment initiated',
      reference: payment.reference,
    };
  }
}
