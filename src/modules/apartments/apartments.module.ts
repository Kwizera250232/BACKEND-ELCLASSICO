import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService, PrismaService],
})
export class ApartmentsModule {}
