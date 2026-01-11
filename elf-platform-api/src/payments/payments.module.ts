import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsAdminService } from './payments-admin.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SmsService } from '../common/sms/sms.service'; // Double check this path!

@Module({
  imports: [PrismaModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService, 
    PaymentsAdminService, 
    SmsService
  ],
  exports: [PaymentsService, PaymentsAdminService],
})
export class PaymentsModule {}