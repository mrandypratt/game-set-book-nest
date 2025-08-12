import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Park } from 'src/entities';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Park])],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
