import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
