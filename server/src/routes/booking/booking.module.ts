import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Park } from 'src/entities/park.entity';
import { User } from 'src/entities/user.entity';
import { EmailService } from '../email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Park, User])],
  controllers: [BookingController],
  providers: [BookingService, EmailService],
})
export class BookingModule {}
