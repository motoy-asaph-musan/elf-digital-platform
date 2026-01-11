import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  Logger 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SmsService } from '../common/sms/sms.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private smsService: SmsService,
  ) {}

  // ADDED: This fixes the Controller error
  async getPendingPayments() {
    return this.prisma.payment.findMany({
      where: { status: 'PENDING' },
      include: { school: true, user: true }
    });
  }

  async verifyPayment(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { school: true }
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${paymentId} not found`);
    }

    if (payment.status === 'SUCCESS') {
      throw new BadRequestException('This payment has already been verified.');
    }

    // FIX: Ensure schoolId is a string and not null for Prisma
    if (!payment.schoolId || !payment.school) {
      throw new BadRequestException('No school associated with this payment.');
    }

    const schoolCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
      await this.prisma.school.update({
        where: { id: payment.schoolId }, // TS is happy now because we checked for null above
        data: { 
          schoolCode,
          isRegistered: true,
          registrationDate: new Date()
        }
      });

      const smsSent = await this.smsService.sendActivationSms(
        payment.school.contactPhone || '',
        payment.school.name,
        schoolCode
      );

      if (!smsSent) {
        this.logger.warn(`SMS could not be delivered to ${payment.school.name}`);
      }

      return this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'SUCCESS' }
      });

    } catch (error: any) {
      this.logger.error(`Verification failed: ${error.message}`);
      throw new BadRequestException('Could not process school activation.');
    }
  }
}