import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Verifies a school's registration payment and activates the school account.
   */
  async verifySchoolPayment(paymentId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch the payment to ensure it exists and get the associated schoolId
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
      });

      if (!payment) {
        throw new NotFoundException(`Payment with ID ${paymentId} not found`);
      }

      if (payment.status === 'VERIFIED' || payment.status === 'SUCCESS') {
        throw new BadRequestException('This payment has already been verified.');
      }

      // 2. Update Payment Status to VERIFIED (Manual ELF Admin check)
      const updatedPayment = await tx.payment.update({
        where: { id: paymentId },
        data: { status: 'VERIFIED' },
      });

      // 3. Activate the School if this was a school registration fee
      if (payment.purpose === 'SCHOOL_REG' && payment.schoolId) {
        await tx.school.update({
          where: { id: payment.schoolId },
          data: { 
            isRegistered: true, 
            registrationDate: new Date() 
          },
        });
      }

      return {
        success: true,
        message: 'Payment verified and school activated successfully.',
        data: updatedPayment,
      };
    });
  }

  /**
   * Fetch all pending payments for the ELF Admin dashboard
   */
  async getPendingPayments() {
    return this.prisma.payment.findMany({
      where: { status: 'PENDING' },
      include: {
        school: { select: { name: true, region: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}