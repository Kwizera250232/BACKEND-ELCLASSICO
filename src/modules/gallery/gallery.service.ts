import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  listBoatGallery() {
    return this.prisma.boatGalleryImage.findMany({
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        imageUrl: true,
        caption: true,
        sortOrder: true,
      },
    });
  }
}
