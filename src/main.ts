import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT', 4001);
  const origin = config.get<string>('FRONTEND_ORIGIN', 'http://localhost:3001');
  const allowedOrigins = origin
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
}

bootstrap();
