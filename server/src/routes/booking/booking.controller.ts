import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { ParkAvailabilityDto } from './dto/park-availability.dto';
import { BookingDurationMinutes, BookingDurations } from '@gamesetbook/shared';
import { ValidateDatePipe, ValidateDurationPipe } from 'src/pipes';
import { RequestBookingDto, BookingDto, ModifyBookingDto } from './dto';
import { BookingConfirmationDto } from './dto/booking-confirmation.dto';

@ApiTags('Bookings')
@Controller('booking')
export class BookingController {
  private readonly logger = new Logger(BookingController.name);

  constructor(private readonly bookingService: BookingService) {}

  @Get('/:bookingId')
  @ApiParam({
    name: 'bookingId',
    type: String,
    description: 'The ID of the booking',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Returns the booking with the given ID',
    type: BookingDto,
  })
  async getBookingById(@Param('bookingId') bookingId: string): Promise<BookingDto> {
    this.logger.log(`getBookingById Request: Booking ID ${bookingId}`);

    const booking = await this.bookingService.getBookingById(bookingId);

    this.logger.log(`getBookingById Response: Booking ${booking.start} - ${booking.end}`);
    return booking;
  }

  @Get('availability/:parkId/:date/:duration')
  @ApiParam({
    name: 'parkId',
    type: Number,
    description: 'The ID of the park',
  })
  @ApiParam({
    name: 'date',
    type: String,
    description: 'Date to check availability for formatted as YYYY-MM-DD',
  })
  @ApiParam({
    name: 'duration',
    type: Number,
    description: `The duration of the booking in minutes: must be ${BookingDurations.join(', ')}`,
    enum: BookingDurations,
  })
  @ApiOkResponse({
    description: 'Returns the availability for the park on the given date',
    type: ParkAvailabilityDto,
  })
  async getParkAvailabilityByDate(
    @Param('parkId') parkId: number,
    @Param('date', new ValidateDatePipe()) date: string,
    @Param('duration', new ValidateDurationPipe()) duration: BookingDurationMinutes
  ): Promise<ParkAvailabilityDto> {
    this.logger.log({
      getParkAvailabilityByDateRequest: { parkId, date, duration },
    });
    const availability = await this.bookingService.getParkAvailabilityByDate(
      parkId,
      date,
      duration
    );

    this.logger.log({
      getParkAvailabilityByDateResponse: {
        parkId,
        slots: availability.slots.length,
      },
    });
    return availability;
  }

  @Post('reserve')
  @ApiBody({
    description: 'The booking to reserve',
    type: RequestBookingDto,
  })
  @ApiCreatedResponse({
    description: 'The booking has been successfully created.',
    type: BookingDto,
  })
  async requestBooking(@Body() bookingDto: RequestBookingDto): Promise<BookingDto> {
    this.logger.log({ requestBookingRequest: bookingDto });

    const booking = await this.bookingService.reserveBooking(bookingDto);

    this.logger.log({ requestBookingResponse: booking });
    return booking;
  }

  @Post('confirm')
  @ApiBody({
    description: 'Booking ID and email of the user confirming the booking',
    type: ModifyBookingDto,
  })
  @ApiCreatedResponse({
    description: 'The booking has been successfully confirmed.',
    type: BookingConfirmationDto,
  })
  async confirmBooking(
    @Body() bookingDto: ModifyBookingDto
  ): Promise<BookingConfirmationDto> {
    this.logger.log({ confirmBookingRequest: bookingDto });

    const booking = await this.bookingService.confirmBooking(bookingDto);

    this.logger.log({ confirmBookingResponse: booking });

    return booking;
  }

  @Post('cancel')
  @ApiBody({
    description: 'Booking ID and email of the user canceling the booking',
    type: ModifyBookingDto,
  })
  @ApiCreatedResponse({
    description: 'The booking has been successfully canceled.',
    type: BookingConfirmationDto,
  })
  async confirmCancellation(
    @Body() bookingDto: ModifyBookingDto
  ): Promise<BookingConfirmationDto> {
    this.logger.log({ confirmCancellationRequest: bookingDto });

    const booking = await this.bookingService.confirmCancellation(bookingDto);

    this.logger.log({ confirmCancellationResponse: booking });

    return booking;
  }
}
