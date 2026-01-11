import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { SubscriptionStatus } from '@prisma/client'; // Import the Enum

@Injectable()
export class SubscriptionTaskService {
  private readonly logger = new Logger(SubscriptionTaskService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSubscriptionExpirations() {
    this.logger.log('Checking for expired subscriptions...');

    const result = await this.prisma.subscription.updateMany({
      where: {
        status: SubscriptionStatus.ACTIVE, // Use the Enum
        endDate: { lt: new Date() },
      },
      data: {
        status: SubscriptionStatus.EXPIRED, // Ensure this matches your schema.prisma
      },
    });

    this.logger.log(`Deactivated ${result.count} expired subscriptions.`);
  }
}