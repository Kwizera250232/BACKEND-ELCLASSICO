import { Controller, Get } from '@nestjs/common';
import { GardensService } from './gardens.service';

@Controller('gardens')
export class GardensController {
  constructor(private readonly gardensService: GardensService) {}

  @Get()
  listVenues() {
    return this.gardensService.listVenues();
  }
}
