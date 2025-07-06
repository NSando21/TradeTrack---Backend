import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDTO } from './dtos/trip.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Post()
  create(@Body() createTripDto: CreateTripDTO) {
    return this.tripsService.create(createTripDto);
  }
}
