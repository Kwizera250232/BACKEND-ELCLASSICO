import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class GardensService {
  constructor(private readonly prisma: PrismaService) {}

  listVenues() {
    return this.prisma.gardenVenue.findMany({
      where: { isAvailable: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
