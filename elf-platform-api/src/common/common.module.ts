import { Module, Global } from '@nestjs/common';
import { SmsService } from './sms/sms.service';

@Global() // This makes SmsService available everywhere
@Module({
  providers: [SmsService],
  exports: [SmsService],
})
export class CommonModule {}