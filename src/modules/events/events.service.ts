import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateEventDto } from './dto.create-event';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  listEvents() {
    return this.prisma.event.findMany({
      include: { vipPackages: true },
      orderBy: { startsAt: 'asc' },
    });
  }

  createEvent(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        startsAt: new Date(dto.startsAt),
        endsAt: new Date(dto.endsAt),
        coverImageUrl: dto.coverImageUrl,
      },
    });
  }
}
