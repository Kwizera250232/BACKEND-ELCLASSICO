import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApartmentsModule } from './modules/apartments/apartments.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { HealthModule } from './modules/health/health.module';
import { MenuModule } from './modules/menu/menu.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    HealthModule,
    AuthModule,
    UsersModule,
    MenuModule,
    EventsModule,
    ReservationsModule,
    ApartmentsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
