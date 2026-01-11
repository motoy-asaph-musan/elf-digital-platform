import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import * as Express from 'express'; // Use namespace import to fix TS1272
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('receipt')
export class ReceiptController {
  constructor(private prisma: PrismaService) {}

  @Get(':paymentId')
  @UseGuards(JwtAuthGuard)
  async downloadReceipt(
    @Param("paymentId") id: string, 
    @Res() res: Express.Response // Reference it via the namespace
  ): Promise<void> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      res.status(404).send('Payment not found');
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Receipt-${payment.reference}.pdf`);

    // Basic placeholder for PDF logic
    res.send("PDF Content would be generated here.");
  }
}