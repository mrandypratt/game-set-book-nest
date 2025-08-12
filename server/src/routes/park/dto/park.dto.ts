import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateParkDto } from './create-park.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 *
 * @export
 * @class ParkDto
 * @extends {CreateParkDto}
 * @description DTO for a park
 */
export class ParkDto extends CreateParkDto {
  @ApiProperty({
    description: 'The ID of the park',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
