import { BOOKING_EXPIRATION_MINUTES, BookingStatus } from '@gamesetbook/shared';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Booking } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>
  ) {}

  @Cron('*/1 * * * *') // Runs every minute
  async removeExpiredBookings() {
    this.logger.log('Removing expired bookings');
    const expirationTime = DateTime.utc()
      .minus({ minutes: BOOKING_EXPIRATION_MINUTES })
      .toISO();

    // Find and delete all expired pending bookings
    const result = await this.bookingRepository
      .createQueryBuilder()
      .delete()
      .from(Booking)
      .where('status = :status', { status: BookingStatus.Pending })
      .andWhere('created < :expirationTime', { expirationTime })
      .execute();

    this.logger.log(
      result.affected
        ? `Removed ${result.affected} expired bookings`
        : 'No expired bookings found'
    );
  }
}
