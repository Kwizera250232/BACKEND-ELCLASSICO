import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GardensController } from './gardens.controller';
import { GardensService } from './gardens.service';

@Module({
  controllers: [GardensController],
  providers: [GardensService, PrismaService],
  exports: [GardensService],
})
export class GardensModule {}
