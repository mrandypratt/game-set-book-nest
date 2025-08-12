import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCourtDto } from './create-court.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 *
 * @export
 * @class CourtDto
 * @extends {CreateCourtDto}
 * @description DTO for a park
 */
export class CourtDto extends CreateCourtDto {
  @ApiProperty({
    description: 'The ID of the court',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
