import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Uncomment when ready
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
// @UseGuards(JwtAuthGuard, RolesGuard) // Protect this route
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("stats")
  // @Roles('ADMIN')
  async getStats() {
    const totalDonations = await this.prisma.payment.aggregate({
      // Added a check: ensured the status is SUCCESS
      where: { 
        status: 'SUCCESS'
      },
      _sum: { amount: true }
    });

    const activeSubs = await this.prisma.subscription.count({
      where: { 
        status: 'ACTIVE' // Match this to your Prisma Enum (ACTIVE/INACTIVE)
      }
    });

    return {
      // Use optional chaining to prevent "Object is possibly undefined"
      totalRevenue: totalDonations?._sum?.amount || 0,
      activeSubscribers: activeSubs || 0
    };
  }
}