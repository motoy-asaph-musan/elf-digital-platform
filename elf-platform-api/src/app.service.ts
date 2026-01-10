import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ELF Digital Platform API is running 🚀';
  }
}
