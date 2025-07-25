import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
} from "@nestjs/common";
import { TripsService } from "./trips.service";
import { CreateTripDTO } from "./dtos/trip.dto";
import { CreateProviderDTO } from "../providers/dtos/create-provider.dto";
import { CreateProductDto } from "@/products/dto/create-product.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MultiAuthGuard } from "../auth/multi-auth.guard";
import { Roles } from "@/decorators/roles.decorator";
import { Role } from "@/roles.enum";
import { RolesGuard } from "../auth/roles.guard";
import { UpdateTripDTO } from "./dtos/update-trip.dto";
import {
  CreateProductByTripIdDoc,
  CreateProviderByTripIdDoc,
  CreateTripByUserIdDoc,
  GetProductByTripIdDoc,
  GetProviderByTripIdDoc,
  GetTripByIdDoc,
  GetTripByUserIdDoc,
  GetTripsDoc,
  UpdateTripByTripIdDoc,
} from "@/swagger-docs/trips.docs";

@ApiTags("Trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get(":tripId/trip")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @GetTripByIdDoc()
  async findById(@Param("tripId") tripId: string) {
    return await this.tripsService.findById(tripId);
  }

  @Get(":userId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @GetTripByUserIdDoc()
  async findAll(@Param("userId") userId: string) {
    return await this.tripsService.findAll(userId);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(MultiAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @GetTripsDoc()
  async getTrips() {
    return await this.tripsService.getTrips();
  }
  // async getTrips(@Query("page") page: string, @Query("limit") limit: string) {
  //   if (page && limit) {
  //     return this.tripsService.getTrips(+page, +limit);
  //   }
  //   return this.tripsService.getTrips(1, 7);
  // }

  @Get(":tripId/providers")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @GetProviderByTripIdDoc()
  async findAllProvidersById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProvidersById(tripId);
  }

  @Get(":tripId/products")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @GetProductByTripIdDoc()
  async findAllProductsById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProductsById(tripId);
  }

  @Post(":tripId/products")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @CreateProductByTripIdDoc()
  async createProduct(
    @Param("tripId") tripId: string,
    @Body() createProductDto: CreateProductDto,
    @Req() req: any
  ) {
    const userId = req.user?.userId;
    return await this.tripsService.createProduct(
      tripId,
      createProductDto,
      userId
    );
  }

  @Post(":tripId/providers")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @CreateProviderByTripIdDoc()
  async createProviders(
    @Param("tripId") tripId: string,
    @Body() createProviderDto: CreateProviderDTO,
    @Req() req: any
  ) {
    const userId = req.user?.userId;
    return await this.tripsService.createProviders(
      tripId,
      createProviderDto,
      userId
    );
  }

  @Post(":userId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @CreateTripByUserIdDoc()
  async create(
    @Param("userId") userId: string,
    @Body() createTripDto: CreateTripDTO
  ) {
    return await this.tripsService.create(userId, createTripDto);
  }

  @Patch(":tripId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @UpdateTripByTripIdDoc()
  async updateTrip(
    @Param("tripId") tripId: string,
    @Body() updateTripDto: UpdateTripDTO
  ) {
    return await this.tripsService.updateTrip(tripId, updateTripDto);
  }
}
