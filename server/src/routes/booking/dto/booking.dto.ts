import {
  BookingDurationMinutes,
  BookingDurations,
  BookingStatus,
  Timezone,
} from '@gamesetbook/shared';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Booking } from 'src/entities';

/**
 * @export
 * @class BookingDto
 * @description DTO for a Booking
 */
export class BookingDto implements Partial<Booking> {
  @ApiProperty({
    description: 'The ID of the booking',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
    description: 'The ID of the park being booked',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  parkId: number;

  @ApiProperty({
    description: 'The time the booking was confirmed',
    example: '2024-01-01T11:00:00.000Z',
    required: false,
    type: String,
  })
  @IsDateString()
  @IsOptional()
  timeConfirmed?: string;

  @ApiProperty({
    description: 'The start time of the booking',
    example: '2024-01-01T11:00:00.000Z',
    required: true,
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({
    description: 'The end time of the booking',
    example: '2024-01-01T12:00:00.000Z',
    required: true,
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({
    description: 'The duration of the booking in minutes',
    example: '60',
    required: true,
    enum: BookingDurations,
  })
  @IsEnum(BookingDurations)
  @IsNotEmpty()
  duration: BookingDurationMinutes;

  @ApiProperty({
    description: 'The status of the booking',
    enum: BookingStatus,
    required: true,
  })
  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status: BookingStatus;

  @ApiProperty({
    description: 'The ID of the user who made the booking',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The timezone of the park',
    enum: Timezone,
    required: true,
  })
  @IsEnum(Timezone)
  @IsNotEmpty()
  timezone: Timezone;
}
