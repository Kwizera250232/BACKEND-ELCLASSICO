import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck() {
    return {
      service: 'el-classico-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
