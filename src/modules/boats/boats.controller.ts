import { Body, Controller, Get, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { BoatsService } from './boats.service';
import { CreateBoatBookingDto } from './dto.create-boat-booking';

@Controller('boats')
export class BoatsController {
  constructor(private readonly boatsService: BoatsService) {}

  @Get()
  listBoats() {
    return this.boatsService.listBoats();
  }

  @Post('bookings')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  createBooking(@Body() dto: CreateBoatBookingDto) {
    return this.boatsService.createBooking(dto);
  }
}
