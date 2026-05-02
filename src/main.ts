import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { UsersService } from './modules/users/users.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const usersService = app.get(UsersService);
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

  const adminEmail = config.get<string>('ADMIN_BOOTSTRAP_EMAIL', '').trim();
  const adminPassword = config.get<string>('ADMIN_BOOTSTRAP_PASSWORD', '').trim();
  const adminFullName = config
    .get<string>('ADMIN_BOOTSTRAP_FULLNAME', 'El Classico Administrator')
    .trim();

  if (adminEmail && adminPassword) {
    await usersService.ensureBootstrapAdmin({
      email: adminEmail,
      fullName: adminFullName,
      password: adminPassword,
    });
    logger.log(`Bootstrap admin ready: ${adminEmail}`);
  } else {
    logger.log('Bootstrap admin skipped (ADMIN_BOOTSTRAP_EMAIL/PASSWORD not set)');
  }

  await app.listen(port);
}

bootstrap();
