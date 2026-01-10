import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsAdminService {
  constructor(private prisma: PrismaService) {}

  // 1. Logic to retry a failed mobile money transaction
  async retryPayment(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });
    if (payment.status === 'SUCCESS' || payment.attempts >= 3) {
      throw new BadRequestException('Cannot retry this payment');
    }
    // Increment attempts and set back to pending for the provider to try again
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { attempts: { increment: 1 }, status: 'PENDING' }
    });
  }

  // 2. Logic for Monthly Totals (Revenue)
  async getMonthlyAnalytics() {
    return this.prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "createdAt") as month, SUM(amount) as total
      FROM "Payment" WHERE status = 'SUCCESS'
      GROUP BY month ORDER BY month DESC
    `;
  }
}