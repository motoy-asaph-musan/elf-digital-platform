import { Controller, Patch, Param, Get, UseGuards, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming you have this
import { RolesGuard } from '../auth/guards/roles.guard'; // Assuming you have this
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('payments') // If your main.ts has a global prefix 'api', this becomes /api/payments
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * List all pending payments for the Admin Dashboard.
   * Only ADMINs should be able to see this queue.
   */
  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getPending() {
    return this.paymentsService.getPendingPayments();
  }

  /**
   * Verify and Activate a specific school payment.
   * Generates the 6-digit code and triggers the activation flow.
   */
  @Patch('verify/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post(':id/verify')
  async verify(@Param('id') id: string) {
    return this.paymentsService.verifyPayment(id);
  }
}