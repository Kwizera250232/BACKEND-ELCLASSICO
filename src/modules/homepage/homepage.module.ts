import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';

@Module({
  controllers: [HomepageController],
  providers: [HomepageService, PrismaService],
  exports: [HomepageService],
})
export class HomepageModule {}
