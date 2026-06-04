import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { SecurityHeadersMiddleware } from './common/middleware/security-headers.middleware';
import { ApartmentsModule } from './modules/apartments/apartments.module';
import { BlogModule } from './modules/blog/blog.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoatsModule } from './modules/boats/boats.module';
import { EventsModule } from './modules/events/events.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { GardensModule } from './modules/gardens/gardens.module';
import { HealthModule } from './modules/health/health.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { MenuModule } from './modules/menu/menu.module';
import { AdminMediaModule } from './modules/admin-media/admin-media.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 120,
      },
    ]),
    HealthModule,
    AuthModule,
    UsersModule,
    AdminMediaModule,
    MenuModule,
    EventsModule,
    ReservationsModule,
    ApartmentsModule,
    BoatsModule,
    GardensModule,
    GalleryModule,
    HomepageModule,
    BlogModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SecurityHeadersMiddleware).forRoutes('*');
  }
}
