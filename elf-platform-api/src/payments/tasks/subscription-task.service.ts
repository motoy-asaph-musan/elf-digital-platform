import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubscriptionTaskService {
  private readonly logger = new Logger(SubscriptionTaskService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Runs every day at midnight (00:00)
   * Automatically deactivates subscriptions where the endDate has passed.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSubscriptionExpirations() {
    this.logger.log('Running daily subscription expiration check...');

    const result = await this.prisma.subscription.updateMany({
      where: {
        active: true,
        endDate: { lt: new Date() }, // If endDate is Less Than (before) now
      },
      data: {
        active: false,
      },
    });

    this.logger.log(`Deactivated ${result.count} expired subscriptions.`);
  }
}