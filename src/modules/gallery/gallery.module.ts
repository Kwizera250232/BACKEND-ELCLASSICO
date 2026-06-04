import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService, PrismaService],
  exports: [GalleryService],
})
export class GalleryModule {}
