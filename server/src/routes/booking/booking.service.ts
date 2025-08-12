import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkAvailabilityDto, ParkAvailabilitySlot } from './dto/park-availability.dto';
import {
  BOOKING_DURATIONS_DISPLAY,
  BookingDurationMinutes,
  BookingStatus,
  Timezone,
} from '@gamesetbook/shared';
import { Booking, Court, Park, User } from 'src/entities';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';
import { RequestBookingDto, BookingDto, ModifyBookingDto } from './dto';
import { EmailService } from '../email/email.service';
import { BookingConfirmationDto } from './dto/booking-confirmation.dto';

@Injectable()
export class BookingService {
  private readonly bookingStartHour: number;
  private readonly bookingEndHour: number;
  private readonly bookingInterval: number;
  private readonly logger = new Logger(BookingService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Park)
    private readonly parkRepo: Repository<Park>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly emailService: EmailService,
    private configService: ConfigService
  ) {
    this.bookingStartHour = parseInt(this.configService.get('BOOKING_START_HOUR'));
    this.bookingEndHour = parseInt(this.configService.get('BOOKING_END_HOUR'));
    this.bookingInterval = parseInt(this.configService.get('BOOKING_INTERVAL'));
  }

  async getBookingById(bookingId: string): Promise<BookingDto> {
    return await this.bookingRepo.findOne({ where: { id: bookingId } });
  }

  /**
   * Get the earliest booking date for a given date and timezone
   * @param dateString Formatted as YYYY-MM-DD
   * @param timezone
   * @returns DateTime set to UTC-Z that represents the earliest booking date in the given timezone
   */
  earliestBookingDate(dateString: string, timezone: Timezone): DateTime {
    return DateTime.fromISO(dateString, { zone: timezone })
      .set({
        hour: this.bookingStartHour,
      })
      .toUTC();
  }

  /**
   * Get the latest booking date for a given date and timezone
   * @param dateString Formatted as YYYY-MM-DD
   * @param timezone
   * @returns DateTime set to UTC-Z that represents the latest booking date in the given timezone
   */
  latestBookingDate(dateString: string, timezone: Timezone): DateTime {
    return DateTime.fromISO(dateString, { zone: timezone })
      .set({
        hour: this.bookingEndHour,
      })
      .toUTC();
  }

  /**
   * Generate all possible slots for a given date and duration
   * @param dateString Formatted as YYYY-MM-DD
   * @param duration
   * @returns ParkAvailabilitySlot[]
   */
  getAllPossibleSlots(
    earliestBookingDate: DateTime,
    latestBookingDate: DateTime,
    duration: BookingDurationMinutes
  ): ParkAvailabilitySlot[] {
    this.logger.log({
      getAllPossibleSlots: {
        earliestBookingDate: earliestBookingDate.toISO(),
        latestBookingDate: latestBookingDate.toISO(),
        duration,
      },
    });

    const slots: ParkAvailabilitySlot[] = [];
    const durationToDisplay = BOOKING_DURATIONS_DISPLAY.find(
      (d) => d.minutes === duration
    );

    for (
      let currentDate = earliestBookingDate;
      currentDate.plus({ minutes: duration }) <= latestBookingDate;
      currentDate = currentDate.plus({ minutes: this.bookingInterval })
    ) {
      slots.push({
        start: currentDate.toISO(),
        end: currentDate.plus({ minutes: duration }).toISO(),
        duration: {
          minutes: durationToDisplay.minutes,
          display: durationToDisplay.display,
        },
        courts: [],
      });
    }

    this.logger.log(`getAllPossibleSlots: Generated ${slots.length} slots`);

    return slots;
  }

  isSlotAvailable(slot: ParkAvailabilitySlot, existingBookings: Booking[]): boolean {
    for (const existingBooking of existingBookings) {
      // If StartTime is between BusySlot Start & End Time or EndTime is between BusySlot Start & End Time
      if (
        (slot.start >= existingBooking.start && slot.start < existingBooking.end) ||
        (slot.end > existingBooking.start && slot.end <= existingBooking.end)
      ) {
        return false;
      }
    }
    return true;
  }

  async getAvailableSlots(
    possibleSlots: ParkAvailabilitySlot[],
    courts: Court[],
    earliestBookingDate: DateTime,
    latestBookingDate: DateTime
  ): Promise<ParkAvailabilitySlot[]> {
    // Using isoStartDateTime as the key for the map
    const slotsMap = new Map<string, ParkAvailabilitySlot>();

    // Pull bookings for courts separately to add court data to slots
    for (const court of courts) {
      const existingBookings = await this.bookingRepo
        .createQueryBuilder('booking')
        .where('booking.courtId = :courtId', { courtId: court.id })
        .andWhere('booking.status != :cancelled', {
          cancelled: BookingStatus.Cancelled,
        })
        .andWhere('(booking.start, booking.end) OVERLAPS (:start, :end)', {
          start: earliestBookingDate.toISO(),
          end: latestBookingDate.toISO(),
        })
        .getMany();

      this.logger.log({
        existingBookingsRetrieved: {
          courtId: court.id,
          bookings: existingBookings.map(
            (booking) => `${booking.start} - ${booking.end}`
          ),
        },
      });

      for (const possibleSlot of possibleSlots) {
        if (!this.isSlotAvailable(possibleSlot, existingBookings)) continue;

        const existingSlot = slotsMap.get(possibleSlot.start);

        if (!existingSlot) {
          slotsMap.set(possibleSlot.start, { ...possibleSlot, courts: [court] });
        } else {
          existingSlot.courts.push(court);
          slotsMap.set(possibleSlot.start, existingSlot);
        }
      }
    }

    return Array.from(slotsMap.values());
  }

  async getParkAvailabilityByDate(
    parkId: number,
    dateString: string,
    duration: BookingDurationMinutes
  ): Promise<ParkAvailabilityDto> {
    try {
      // Get Timezone for park
      const park = await this.parkRepo.findOne({
        where: { id: parkId },
        relations: ['courts'],
      });

      this.logger.log({ getParkAvailabilityByDate: { park } });

      const earliestBookingDate = this.earliestBookingDate(dateString, park.timezone);
      const latestBookingDate = this.latestBookingDate(dateString, park.timezone);

      // Generate availability slots for the date range
      const possibleSlots = this.getAllPossibleSlots(
        earliestBookingDate,
        latestBookingDate,
        duration
      );

      const availability: ParkAvailabilityDto = {
        parkId: park.id,
        timezone: park.timezone,
        slots: await this.getAvailableSlots(
          possibleSlots,
          park.courts,
          earliestBookingDate,
          latestBookingDate
        ),
      };
      // Return availability
      return availability;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(`Park with id ${parkId} not found`);
    }
  }

  async reserveBooking(reserveBookingDto: RequestBookingDto): Promise<BookingDto> {
    const { parkId, courtId, start, end, duration, email, timezone } = reserveBookingDto;

    let user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      this.logger.log(`createBooking: User ${email} not found`);
      user = await this.userRepo.save(this.userRepo.create({ email }));
      this.logger.log(`createBooking: User ${user?.email} created`);
    } else {
      this.logger.log(`createBooking: User ${user.email} found`);
    }

    const bookingToSave: Omit<
      Booking,
      'id' | 'created' | 'updated' | 'user' | 'park' | 'court'
    > = {
      courtId,
      parkId,
      start,
      end,
      duration,
      status: BookingStatus.Pending,
      userId: user.id,
      timezone,
    };

    const savedBooking = await this.bookingRepo.save(
      this.bookingRepo.create(bookingToSave)
    );

    this.logger.log({ savedBooking });

    await this.emailService.sendRequestBookingEmail(savedBooking, email);

    return savedBooking;
  }

  async confirmBooking(
    confirmBookingDto: ModifyBookingDto
  ): Promise<BookingConfirmationDto> {
    try {
      const { bookingId, email } = confirmBookingDto;

      const booking = await this.bookingRepo.findOne({
        where: { id: bookingId },
        relations: ['user', 'park', 'court'],
      });

      if (!booking) {
        this.logger.error({ bookingNotFound: { email, bookingId, booking } });
        throw new NotFoundException(`Booking with id ${bookingId} not found`);
      }

      if (!booking.user || booking.user.email !== email) {
        this.logger.error({ userNotFound: { email, bookingId, booking } });
        throw new BadRequestException(`User with email ${email} not found`);
      }

      const confirmedBooking = await this.bookingRepo.save({
        ...booking,
        status: BookingStatus.Confirmed,
        timeConfirmed: DateTime.now().toISO(),
      });

      await this.emailService.sendConfirmationEmail(confirmedBooking);

      const { addressLine, city, state, zip } = booking.park;

      return {
        ...confirmedBooking,
        parkName: booking.park.name,
        fullParkAddress: `${addressLine}, ${city}, ${state} ${zip}`,
        courtNumber: booking.court.courtNumber,
        userEmail: booking.user.email,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Error confirming booking`);
    }
  }

  async confirmCancellation(
    bookingDto: ModifyBookingDto
  ): Promise<BookingConfirmationDto> {
    const { bookingId, email } = bookingDto;

    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['court', 'park', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (!booking.user || booking.user.email !== email) {
      throw new BadRequestException(`User with email ${email} not found`);
    }

    booking.status = BookingStatus.Cancelled;
    await this.bookingRepo.save(booking);

    await this.emailService.sendCancellationEmail(booking);

    const { addressLine, city, state, zip } = booking.park;

    return {
      ...booking,
      parkName: booking.park.name,
      fullParkAddress: `${addressLine}, ${city}, ${state} ${zip}`,
      courtNumber: booking.court.courtNumber,
      userEmail: booking.user.email,
    };
  }
}
