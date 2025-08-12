import {
  BookingDurationDisplay,
  BookingDurationMinutes,
  BookingDurations,
  Timezone,
} from '@gamesetbook/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CourtDto } from 'src/routes/park/dto';

/**
 *
 * @export
 * @class BookingDurationDisplayDto
 * @description DTO for associating Booking Times with Display Strings
 */

export class BookingDurationDisplayDto implements BookingDurationDisplay {
  @ApiProperty({
    description: 'The duration of the slot.',
    example: '30',
    required: true,
    enum: BookingDurations,
  })
  @IsEnum(BookingDurations)
  @IsNotEmpty()
  minutes: BookingDurationMinutes;

  @ApiProperty({
    description: 'The display string for the duration.',
    example: '30 minutes',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  display: string;
}

/**
 *
 * @export
 * @class ParkAvailabilitySlot
 * @description ParkAvailabilitySlot is a list of available slots and the
 * an Array of courtIds that are available to book for that slot.
 */
export class ParkAvailabilitySlot {
  @ApiProperty({
    description: 'The start time of the slot.',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
    type: String,
  })
  @IsDateString()
  start: string;

  @ApiProperty({
    description: 'The end time of the slot.',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
    type: String,
  })
  @IsDateString()
  end: string;

  @ApiProperty({
    description: 'The duration of the slot.',
    example: '30',
    required: true,
    type: BookingDurationDisplayDto,
  })
  @ValidateNested()
  @Type(() => BookingDurationDisplayDto)
  duration: BookingDurationDisplayDto;

  @ApiProperty({
    description: 'The list of courts available for the slot.',
    example: [],
    required: true,
    type: [CourtDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourtDto)
  courts: CourtDto[];
}

/**
 *
 * @export
 * @class ParkAvailability
 * @description ParkAvailability is a list of available slots for a given park
 * with the slots and the courtIds that are available to book for that slot.
 */
export class ParkAvailabilityDto {
  /**
   * The ID of the park to get availability for.
   */
  @ApiProperty({
    description: 'The ID of the park to get availability for.',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  parkId: number;

  /**
   * The timezone for the park.
   */
  @ApiProperty({
    description: 'The timezone for the park.',
    example: 'America/New_York',
    required: true,
    enum: Timezone,
  })
  @IsEnum(Timezone)
  @IsNotEmpty()
  timezone: Timezone;

  /**
   * The list of Slots available for the park on a given date.
   */
  @ApiProperty({
    description: 'The list of Slots available for the park on a given date.',
    example: [],
    required: true,
    type: [ParkAvailabilitySlot],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParkAvailabilitySlot)
  slots: ParkAvailabilitySlot[];
}
