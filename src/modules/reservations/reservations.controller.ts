import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReservationDto } from './dto.create-reservation';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  listReservations() {
    return this.reservationsService.listReservations();
  }

  @Post()
  createReservation(@Body() dto: CreateReservationDto) {
    return this.reservationsService.createReservation(dto);
  }
}
