import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Court } from 'src/entities/court.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CourtService {
  private readonly logger = new Logger(CourtService.name);

  constructor(@InjectRepository(Court) private courtRepository: Repository<Court>) {}

  async getCourts(): Promise<Court[]> {
    this.logger.log({ getCourtsInput: {} });

    const courts = await this.courtRepository.find();

    this.logger.log({ getCourtsOutput: { courts } });
    return courts;
  }
}
