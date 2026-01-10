import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This makes Prisma available everywhere without re-importing
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Must export for use in other modules
})
export class PrismaModule {}