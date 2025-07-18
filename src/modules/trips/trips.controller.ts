import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
import { AuthGuard } from "@nestjs/passport";
import { MultiAuthGuard } from "../auth/multi-auth.guard";

@ApiTags("Trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // @Get("/:id")
  // @ApiOperation({ summary: "Obtener viaje por id" })
  // @ApiResponse({
  //   description: "Viaje obtenido correctamente",
  // })
  // async findById(@Param("id") id: string) {
  //   return await this.tripsService.findById(id);
  // }

  @Get(":userId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: "Obtener todos los viajes" })
  @ApiResponse({
    description: "Todos los viajes listados correctamente",
  })
  async findAll(@Param("userId") userId: string) {
    return await this.tripsService.findAll(userId);
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
}
