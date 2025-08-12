import { BookingDurationMinutes, BookingDurations, Timezone } from '@gamesetbook/shared';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

/**
 *
 * @export
 * @class RequestBookingDto
 * @description DTO for reserving a Booking
 */
export class RequestBookingDto {
  @ApiProperty({
    description: 'The ID of the park being booked',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  parkId: number;

  @ApiProperty({
    description: 'The ID of the court being booked',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  courtId: number;

  @ApiProperty({
    description: 'The timezone of the court being booked',
    example: 'America/New_York',
    required: true,
    enum: Timezone,
  })
  @IsEnum(Timezone)
  @IsNotEmpty()
  timezone: Timezone;

  @ApiProperty({
    description: 'The email of the user booking the court',
    example: 'test@test.com',
    type: String,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The start time of the booking',
    example: '2024-01-01T11:00:00.000Z',
    type: String,
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({
    description: 'The end time of the booking',
    example: '2024-01-01T12:00:00.000Z',
    type: String,
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({
    description: 'The duration of the booking in minutes',
    example: BookingDurations.join(', '),
    enum: BookingDurations,
    required: true,
  })
  @IsEnum(BookingDurations)
  @IsNotEmpty()
  duration: BookingDurationMinutes;
}
