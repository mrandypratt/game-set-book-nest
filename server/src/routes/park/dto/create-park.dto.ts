import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateCourtDto } from './create-court.dto';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Timezone } from '@gamesetbook/shared';

/**
 *
 * @export
 * @class CreateParkDto
 * @description DTO for creating a park
 */
export class CreateParkDto {
  /**
   * The name of the park.
   */
  @ApiProperty({
    description: 'The name of the park.',
    example: 'The Tennis Club',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The address line for the park.
   */
  @ApiProperty({
    description: 'The address line for the park.',
    example: '123 Main St',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  addressLine: string;

  /**
   * The city for the park.
   */
  @ApiProperty({
    description: 'The city for the park.',
    example: 'San Francisco',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  /**
   * The state for the park (e.g. CA).
   */
  @ApiProperty({
    description: 'The state for the park (e.g. CA).',
    example: 'CA',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  /**
   * The zip code for the park.
   */
  @ApiProperty({
    description: 'The zip code for the park.',
    example: '94103',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  zip: string;

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
  timezone: Timezone;

  /**
   * Whether the park has lights.
   */
  @ApiPropertyOptional({
    description: 'Whether the park has lights.',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  lighted?: boolean;

  /**
   * Whether the park has bathrooms.
   */
  @ApiPropertyOptional({
    description: 'Whether the park has bathrooms.',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  bathrooms?: boolean;

  /**
   * Whether the park is a tennis club.
   */
  @ApiPropertyOptional({
    description: 'Whether the park is a tennis club.',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  tennisClub?: boolean;

  /**
   * Whether the park has a ball wall.
   */
  @ApiPropertyOptional({
    description: 'Whether the park has a ball wall.',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  ballWall?: boolean;

  /**
   * Whether the park has a tennis store.
   */
  @ApiPropertyOptional({
    description: 'Whether the park has a tennis store.',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  tennisStore?: boolean;

  /**
   * Whether the park has a fee.
   */
  @ApiPropertyOptional({
    description: 'Whether the park has a fee.',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  fee?: boolean;

  /**
   * Whether the park is restricted.
   */
  @ApiPropertyOptional({
    description: 'Whether the park is restricted.',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  restricted?: boolean;

  /**
   * The list of courts associated with the park.
   */
  @ApiPropertyOptional({
    description: 'The list of courts associated with the park.',
    example: [],
    required: false,
    type: [CreateCourtDto],
  })
  @IsOptional()
  @IsArray()
  courts?: CreateCourtDto[];
}
