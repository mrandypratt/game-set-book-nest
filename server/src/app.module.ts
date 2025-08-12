import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourtModule } from './routes/court/court.module';
import { ParkModule } from './routes/park/park.module';
import { UserModule } from './routes/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Booking, Court, Park, User } from './entities';
import { BookingModule } from './routes/booking/booking.module';
import { LoggerModule } from './routes/logger/logger.module';
import { EmailModule } from './routes/email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './routes/schedule/schedule.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
    BookingModule,
    CourtModule,
    ParkModule,
    UserModule,
    LoggerModule,
    TypeOrmModule.forFeature([Booking]),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: configService.get('PGPORT'),
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        entities: [User, Park, Court, Booking],
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule {}
