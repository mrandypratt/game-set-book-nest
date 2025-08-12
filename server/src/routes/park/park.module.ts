import { Module } from '@nestjs/common';
import { ParkController } from './park.controller';
import { ParkService } from './park.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Park } from 'src/entities/park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Park])],
  controllers: [ParkController],
  providers: [ParkService],
})
export class ParkModule {}
