import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateReservationDto } from './dto.create-reservation';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  listReservations() {
    return this.prisma.reservation.findMany({
      include: { user: true },
      orderBy: { reservationAt: 'asc' },
    });
  }

  createReservation(dto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: {
        userId: dto.userId,
        reservationAt: new Date(dto.reservationAt),
        guests: dto.guests,
        zone: dto.zone,
        notes: dto.notes,
      },
    });
  }
}
