import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ParkService } from './park.service';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateParkDto, ParkDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Parks')
@Controller('park')
export class ParkController {
  private readonly logger = new Logger(ParkController.name);

  constructor(private readonly parkService: ParkService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns all parks',
    type: [ParkDto],
  })
  async getAllParks(): Promise<ParkDto[]> {
    this.logger.log('getAllParks');

    const parks = await this.parkService.getAllParks();

    this.logger.log(`getAllParksOutput: Returned ${parks.length} parks`);
    return parks;
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: "Retrieves a Park and it's related courts by Id",
    type: [ParkDto],
  })
  async getPark(@Param('id') id: number): Promise<ParkDto> {
    this.logger.log({ getParkInput: { id } });

    const park = await this.parkService.getPark(id);

    this.logger.log({ getParkOutput: { park } });
    return park;
  }

  @Post()
  @ApiBody({ type: CreateParkDto })
  @ApiCreatedResponse({
    description: 'The park has been successfully created.',
    type: ParkDto,
  })
  async createPark(@Body() createParkDto: CreateParkDto): Promise<ParkDto> {
    this.logger.log({ createParkInput: { createParkDto } });

    const savedPark = await this.parkService.createPark(createParkDto);

    this.logger.log({ createParkOutput: { savedPark } });
    return savedPark;
  }
}
