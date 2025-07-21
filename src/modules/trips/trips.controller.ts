import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Query,
} from "@nestjs/common";
import { TripsService } from "./trips.service";
import { CreateTripDTO } from "./dtos/trip.dto";
import { CreateProviderDTO } from "../providers/dtos/create-provider.dto";
import { CreateProductDto } from "@/products/dto/create-product.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { MultiAuthGuard } from "../auth/multi-auth.guard";
import { Roles } from "@/decorators/roles.decorator";
import { Role } from "@/roles.enum";
import { RolesGuard } from "../auth/roles.guard";

@ApiTags("Trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get(":tripId/trip")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtener viaje por ID del viaje" })
  @ApiResponse({
    description: "Viaje obtenido correctamente",
  })
  async findById(@Param("tripId") tripId: string) {
    return await this.tripsService.findById(tripId);
  }

  @Get(":userId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtener todos los viajes por ID del usuario" })
  @ApiResponse({
    description: "Todos los viajes listados correctamente",
  })
  async findAll(@Param("userId") userId: string) {
    return await this.tripsService.findAll(userId);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(MultiAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtener todos los viajes" })
  @ApiResponse({
    description: "Todos los viajes listados correctamente",
  })
  async getTrips(@Query("page") page: string, @Query("limit") limit: string) {
    if (page && limit) {
      return this.tripsService.getTrips(+page, +limit);
    }
    return this.tripsService.getTrips(1, 7);
  }

  @Get(":tripId/providers")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtener todos los proveedores" })
  @ApiResponse({
    description: "Todos los proveedores listados correctamente",
  })
  async findAllProvidersById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProvidersById(tripId);
  }

  @Get(":tripId/products")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtener todos los productos" })
  @ApiResponse({
    description: "Todos los productos listados correctamente",
  })
  async findAllProductsById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProductsById(tripId);
  }

  @Post(":tripId/products")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Crear producto" })
  @ApiResponse({
    description: "Producto creado correctamente",
  })
  async createProduct(
    @Param("tripId") tripId: string,
    @Body() createProductDto: CreateProductDto
  ) {
    return await this.tripsService.createProduct(tripId, createProductDto);
  }

  @Post(":tripId/providers")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Crear proveedor" })
  @ApiResponse({
    description: "Proveedor creado correctamente",
  })
  async createProviders(
    @Param("tripId") id: string,
    @Body() createProviderDto: CreateProviderDTO
  ) {
    return await this.tripsService.createProviders(id, createProviderDto);
  }

  @Post(":userId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Crear viaje" })
  @ApiResponse({
    description: "Viaje creado correctamente",
  })
  async create(
    @Param("userId") userId: string,
    @Body() createTripDto: CreateTripDTO
  ) {
    return await this.tripsService.create(userId, createTripDto);
  }

  @Put(":tripId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Modificar viaje" })
  @ApiResponse({
    description: "Viaje modificado correctamente",
  })
  async updateTrip(
    @Param("tripId") tripId: string,
    @Body() createTripDto: CreateTripDTO
  ) {
    return await this.tripsService.updateTrip(tripId, createTripDto);
  }
}
