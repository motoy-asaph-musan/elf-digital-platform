import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller("payments/webhook")
export class PaymentsWebhookController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() payload: any) {
    const { reference, status } = payload;

    await this.prisma.payment.update({
      where: { reference },
      data: { status },
    });

    return { received: true };
  }
}
