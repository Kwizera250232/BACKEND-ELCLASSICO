import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEventDto } from './dto.create-event';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  listEvents() {
    return this.eventsService.listEvents();
  }

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventsService.createEvent(dto);
  }
}
