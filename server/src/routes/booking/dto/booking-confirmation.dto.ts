import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookingDto } from './booking.dto';

/**
 * @export
 * @class BookingDto
 * @description DTO for a Booking
 */
export class BookingConfirmationDto extends BookingDto {
  @ApiProperty({
    description: 'The name of the park',
    example: 'Central Park Tennis Courts',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  parkName: string;

  @ApiProperty({
    description: 'The full address of the park',
    example: '123 Main St, New York, NY 10001',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fullParkAddress: string;

  @ApiProperty({
    description: 'The Number of the court being booked',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  courtNumber: number;

  @ApiProperty({
    description: 'The ID of the user who made the booking',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;
}
