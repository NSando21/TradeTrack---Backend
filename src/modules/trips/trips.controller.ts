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

  //   @Get(":id")
  //   findOne(@Param("id") id: string) {
  //     return this.usersService.findOne(id);
  //   }

  @Post()
  create(@Body() createTripDto: CreateTripDTO) {
    return this.tripsService.create(createTripDto);
  }

  //   @Patch(":id")
  //   update(@Param("id") id: string, @Body() updateUserDto: Partial<User>) {
  //     return this.usersService.update(id, updateUserDto);
  //   }

  //   @Delete(":id")
  //   remove(@Param("id") id: string) {
  //     return this.usersService.remove(id);
  //   }
}
