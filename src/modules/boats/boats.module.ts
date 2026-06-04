import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { BoatsController } from './boats.controller';
import { BoatsService } from './boats.service';

@Module({
  controllers: [BoatsController],
  providers: [BoatsService, PrismaService],
  exports: [BoatsService],
})
export class BoatsModule {}
