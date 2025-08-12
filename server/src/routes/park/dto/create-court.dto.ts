import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { CourtConfiguration, CourtType, Timezone } from '@gamesetbook/shared';

/**
 *
 * @export
 * @class CreateCourtDto
 * @description DTO for creating a Court
 */
export class CreateCourtDto {
  /**
   * The court number within a park.
   */
  @ApiProperty({
    description: 'The court number within a park.',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  courtNumber: number;

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
   * Tennis or Pickleball.
   */
  @ApiProperty({
    description: 'Tennis or Pickleball.',
    example: 'Tennis',
    required: true,
    enum: CourtType,
  })
  @IsEnum(CourtType)
  @IsNotEmpty()
  type: CourtType;

  /**
   * How the court is configured with respect to Tennis and Pickleball.
   */
  @ApiProperty({
    description: 'How the court is configured with respect to Tennis and Pickleball.',
    example: 'Tennis',
    required: true,
    enum: CourtConfiguration,
  })
  @IsEnum(CourtConfiguration)
  @IsNotEmpty()
  configuration: CourtConfiguration;

  /**
   * Unique identifier for composite courts, meaning a single Tennis Court
   * with multiple uses or multiple Pickleball courts on a single Tennis court.
   */
  @ApiPropertyOptional({
    description:
      'Unique identifier for composite courts, meaning a single Tennis Court with multiple uses or multiple Pickleball courts on a single Tennis court.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  compositeId?: string;
}
