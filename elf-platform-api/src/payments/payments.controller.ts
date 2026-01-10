import { Controller, Patch, Param, Get, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // List all pending payments for Mr. Paul & Mrs. Erin
  @Get('pending')
  async getPending() {
    return this.paymentsService.getPendingPayments();
  }

  // Verify and Activate a specific payment
  @Patch('verify/:id')
  async verify(@Param('id') id: string) {
    return this.paymentsService.verifySchoolPayment(id);
  }
}