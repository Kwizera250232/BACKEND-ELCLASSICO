import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBookingDto } from './dto.create-booking';
import { ApartmentsService } from './apartments.service';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  listApartments() {
    return this.apartmentsService.listApartments();
  }

  @Get('rooms')
  listRooms() {
    return this.apartmentsService.listRooms();
  }

  @Post('bookings')
  createBooking(@Body() dto: CreateBookingDto) {
    return this.apartmentsService.createBooking(dto);
  }
}
