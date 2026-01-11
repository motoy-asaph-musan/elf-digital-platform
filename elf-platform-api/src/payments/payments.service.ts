import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SmsService } from '../common/sms.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private smsService: SmsService
  ) {}

  /**
   * Verifies a school's registration payment, generates a unique 6-digit 
   * access code, and sends it to the headteacher via SMS.
   */
  async verifySchoolPayment(paymentId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch the payment with associated school
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
        include: { school: true }
      });

      if (!payment) {
        throw new NotFoundException(`Payment with ID ${paymentId} not found`);
      }

      // Check if already processed to prevent duplicate SMS/Codes
      if (payment.status === 'VERIFIED' || payment.status === 'SUCCESS') {
        throw new BadRequestException('This payment has already been verified.');
      }

      // 2. Generate a Unique 6-Digit School Code
      let schoolCode: string;
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 10) {
        schoolCode = Math.floor(100000 + Math.random() * 900000).toString();
        const existing = await tx.school.findUnique({ where: { schoolCode } });
        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        throw new BadRequestException('Could not generate a unique school code. Please try again.');
      }

      // 3. Update Payment Status
      const updatedPayment = await tx.payment.update({
        where: { id: paymentId },
        data: { status: 'VERIFIED' },
      });

      // 4. Activate School & Attach Code
      let schoolData = null;
      if (payment.purpose === 'SCHOOL_REG' && payment.schoolId) {
        schoolData = await tx.school.update({
          where: { id: payment.schoolId },
          data: { 
            isRegistered: true, 
            schoolCode: schoolCode,
            registrationDate: new Date() 
          },
        });

        // 5. Trigger SMS Notification
        // We use the contactPhone from the school record
        if (schoolData.contactPhone) {
          try {
            await this.smsService.sendActivationSms(
              schoolData.contactPhone,
              schoolData.name,
              schoolCode
            );
          } catch (smsError) {
            // We log the error but don't fail the transaction 
            // so the admin doesn't have to re-verify.
            this.logger.error(`SMS Delivery failed for ${schoolData.name}: ${smsError.message}`);
          }
        }
      }

      return {
        success: true,
        message: 'Payment verified and school activation code sent.',
        data: {
          paymentId: updatedPayment.id,
          schoolCode: schoolCode,
          schoolName: schoolData?.name,
          recipient: schoolData?.contactPhone
        },
      };
    });
  }

  /**
   * Fetch all pending payments with relevant metadata for Admin review.
   */
  async getPendingPayments() {
    return this.prisma.payment.findMany({
      where: { status: 'PENDING' },
      include: {
        school: { 
          select: { 
            name: true, 
            region: true, 
            contactPhone: true 
          } 
        },
        user: { 
          select: { 
            name: true, 
            email: true 
          } 
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}