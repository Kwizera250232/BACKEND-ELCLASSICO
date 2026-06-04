import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateBoatBookingDto } from './dto.create-boat-booking';

@Injectable()
export class BoatsService {
  constructor(private readonly prisma: PrismaService) {}

  listBoats() {
    return this.prisma.boat.findMany({
      where: { isAvailable: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async createBooking(dto: CreateBoatBookingDto) {
    const boat = await this.prisma.boat.findUnique({ where: { id: dto.boatId } });

    if (!boat || !boat.isAvailable) {
      throw new NotFoundException('Boat not found or unavailable');
    }

    return this.prisma.boatBooking.create({
      data: {
        boatId: dto.boatId,
        fullName: dto.fullName.trim(),
        email: dto.email.trim().toLowerCase(),
        phone: dto.phone?.trim(),
        tripDate: new Date(dto.tripDate),
        guests: dto.guests,
        notes: dto.notes?.trim(),
        totalAmount: new Prisma.Decimal(dto.totalAmount),
      },
      select: {
        id: true,
        status: true,
        tripDate: true,
        createdAt: true,
      },
    });
  }
}
