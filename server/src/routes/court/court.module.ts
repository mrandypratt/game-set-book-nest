import { Module } from '@nestjs/common';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Court } from 'src/entities/court.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Court])],
  controllers: [CourtController],
  providers: [CourtService],
})
export class CourtModule {}
