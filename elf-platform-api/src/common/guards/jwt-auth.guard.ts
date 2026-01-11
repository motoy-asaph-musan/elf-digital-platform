import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * canActivate determines if the request should proceed.
   * It calls the Passport JWT strategy automatically.
   */
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /**
   * handleRequest allows you to customize the error thrown 
   * if the user is not authenticated.
   */
  handleRequest(err: any, user: any, info: any) {
    // You can throw a custom exception here if needed
    if (err || !user) {
      throw err || new UnauthorizedException('Please log in to access this resource');
    }
    return user;
  }
}