import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsAdminService {
  constructor(private prisma: PrismaService) {}

  async retryPayment(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({ 
      where: { id: paymentId } 
    });

    // 1. Fix "possibly null" error with a clear check
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // 2. Check status and attempts safely
    // Note: Assuming 'attempts' exists in your schema.prisma for the Payment model
    if (payment.status === 'SUCCESS' || (payment as any).attempts >= 3) {
      throw new BadRequestException('Cannot retry this payment: already successful or max retries reached');
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { 
        attempts: { increment: 1 }, 
        status: 'PENDING' 
      }
    });
  }

  async getMonthlyAnalytics() {
    // Note: This query assumes you are using PostgreSQL. 
    // If using SQLite, you would use strftime('%m', createdAt)
    return this.prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "createdAt") as month, SUM(amount) as total
      FROM "Payment" 
      WHERE status = 'SUCCESS'
      GROUP BY month 
      ORDER BY month DESC
    `;
  }
}