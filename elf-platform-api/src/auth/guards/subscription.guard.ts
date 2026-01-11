import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException 
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assumes AuthGuard is used before this

    if (!user) return false;

    // Admins bypass subscription checks
    if (user.role === 'ADMIN') return true;

    // Check for an active subscription linked to the user or their school
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        payment: {
          OR: [
            { userId: user.id },
            { user: { schoolId: user.schoolId } }
          ]
        },
        status: 'ACTIVE',
        endDate: { gte: new Date() }, // Must not be expired
      },
    });

    if (!subscription) {
      throw new ForbiddenException(
        'Access denied. Your school needs an active subscription to access this contest.',
      );
    }

    return true;
  }
}