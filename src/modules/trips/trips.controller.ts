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
import { CreateProductDto } from "@/products/dto/create-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get("/:id")
  @ApiOperation({ summary: "Obtener viaje por id" })
  @ApiResponse({
    description: "Viaje obtenido correctamente",
  })
  async findById(@Param("id") id: string) {
    return await this.tripsService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: "Obtener todos los viajes" })
  @ApiResponse({
    description: "Todos los viajes listados correctamente",
  })
  async findAll() {
    return await this.tripsService.findAll();
  }

  @Get(":tripId/providers")
  @ApiOperation({ summary: "Obtener todos los proveedores" })
  @ApiResponse({
    description: "Todos los proveedores listados correctamente",
  })
  async findAllProvidersById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProvidersById(tripId);
  }

  @Get(":tripId/products")
  @ApiOperation({ summary: "Obtener todos los productos" })
  @ApiResponse({
    description: "Todos los productos listados correctamente",
  })
  async findAllProductsById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProductsById(tripId);
  }

  @Post(":tripId/products")
  @ApiOperation({ summary: "Crear producto" })
  @ApiResponse({
    description: "Producto creado correctamente",
  })
  async createProduct(
    @Param("id") id: string,
    @Body() createProductDto: CreateProductDto
  ) {
    return await this.tripsService.createProduct(id, createProductDto);
  }

  @Post(":tripId/providers")
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

  @Post()
  @ApiOperation({ summary: "Crear viaje" })
  @ApiResponse({
    description: "Viaje creado correctamente",
  })
  async create(@Body() createTripDto: CreateTripDTO) {
    return await this.tripsService.create(createTripDto);
  }
}
