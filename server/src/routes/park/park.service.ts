import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { CreateParkDto, ParkDto } from './dto';
import { Park } from 'src/entities/park.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ParkService {
  private readonly logger = new Logger(ParkService.name);

  constructor(@InjectRepository(Park) private readonly parkRepo: Repository<Park>) {}
  async getAllParks() {
    return await this.parkRepo.find({ relations: ['courts'] });
  }

  async getPark(id: number) {
    this.logger.log({ getParkInput: { id } });

    const park = await this.parkRepo.findOne({ where: { id }, relations: ['courts'] });

    this.logger.log({ getParkOutput: { park } });
    return park;
  }

  async createPark(park: CreateParkDto): Promise<ParkDto> {
    return await this.parkRepo.save(this.parkRepo.create(park));
  }
}
