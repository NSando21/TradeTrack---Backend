import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TripsService } from "./trips.service";
import { CreateTripDTO } from "./dtos/trip.dto";
import { CreateProviderDTO } from "../providers/dtos/create-provider.dto";

@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(":tripId/providers")
  findAllProvidersById(@Param("tripId") tripId: string) {
    return this.tripsService.findAllProvidersById(tripId);
  }

  @Post(":tripId/products")
  createProduct(@Param("id") id: string, @Body() createTripDto: CreateTripDTO) {
    return this.tripsService.createProduct(id, createTripDto);
  }

  @Post(":tripId/providers")
  createProviders(
    @Param("tripId") id: string,
    @Body() createProviderDto: CreateProviderDTO
  ) {
    return this.tripsService.createProviders(id, createProviderDto);
  }

  @Post()
  create(@Body() createTripDto: CreateTripDTO) {
    return this.tripsService.create(createTripDto);
  }
}
