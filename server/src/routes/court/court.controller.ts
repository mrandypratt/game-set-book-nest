import { Controller, Get, Logger } from '@nestjs/common';
import { CourtService } from './court.service';
import { Court } from 'src/entities/court.entity';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Courts')
@Controller('court')
export class CourtController {
  private readonly logger = new Logger(CourtController.name);

  constructor(private readonly courtService: CourtService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns all courts',
    type: [Court],
  })
  async getCourts(): Promise<Court[]> {
    this.logger.log({ getCourtsInput: {} });

    const courts = await this.courtService.getCourts();

    this.logger.log({ getCourtsOutput: { courts } });
    return courts;
  }
}
