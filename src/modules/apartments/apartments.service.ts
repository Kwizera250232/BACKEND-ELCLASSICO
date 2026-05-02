import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateBookingDto } from './dto.create-booking';

@Injectable()
export class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  listApartments() {
    return this.prisma.apartment.findMany({
      include: {
        rooms: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  listRooms() {
    return this.prisma.room.findMany({
      include: { apartment: true },
      orderBy: [{ apartment: { name: 'asc' } }, { title: 'asc' }],
    });
  }

  createBooking(dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        userId: dto.userId,
        roomId: dto.roomId,
        checkInDate: new Date(dto.checkInDate),
        checkOutDate: new Date(dto.checkOutDate),
        totalAmount: new Prisma.Decimal(dto.totalAmount),
      },
    });
  }
}
