import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { TripsService } from "./trips.service";
import { CreateTripDTO } from "./dtos/trip.dto";
import { CreateProviderDTO } from "../providers/dtos/create-provider.dto";
import { CreateProductDto } from "@/products/dto/create-product.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { MultiAuthGuard } from "../auth/multi-auth.guard";
import { Roles } from "@/decorators/roles.decorator";
import { Role } from "@/roles.enum";
import { RolesGuard } from "../auth/roles.guard";
import { UpdateTripDTO } from "./dtos/update-trip.dto";

@ApiTags("Trips")
@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get(":tripId/trip")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Obtener viaje por ID del viaje",
    description:
      "Recupera los detalles completos de un viaje específico incluyendo sus productos y proveedores relacionados.",
  })
  @ApiParam({
    name: "tripId",
    description: "ID único del viaje a recuperar",
    type: "string",
  })
  @ApiOkResponse({
    description: "Viaje obtenido correctamente",
    schema: {
      example: {
        id: "2df8f325-81d8-4a83-8740-c0e2eed554be",
        name: "Viaje #1",
        date: "2025-07-05",
        travelers: ["Pepito Torres", "Juan Perez"],
        observation: "Este viaje es para cotizar productos de China",
        createdAt: "2025-07-22T05:09:13.495Z",
        updatedAt: "2025-07-22T05:09:13.495Z",
        products: [],
        providers: [],
      },
    },
  })
  @ApiNotFoundResponse({
    description: "Viaje no encontrado",
    content: {
      "application/json": {
        example: {
          statusCode: 404,
          message: "Trip not found",
          error: "Not Found",
        },
      },
    },
  })
  async findById(@Param("tripId") tripId: string) {
    return await this.tripsService.findById(tripId);
  }

  @Get(":userId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: "Obtener todos los viajes de un usuario" })
  @ApiResponse({
    description: "Todos los viajes listados correctamente",
    schema: {
      example: {
        id: "2df8f325-81d8-4a83-8740-c0e2eed554be",
        name: "Viaje #1",
        date: "2025-07-05",
        travelers: ["Pepito Torres", "Juan Perez"],
        observation: "Este viaje es para cotizar productos de China",
        createdAt: "2025-07-22T05:09:13.495Z",
        updatedAt: "2025-07-22T05:09:13.495Z",
      },
    },
    isArray: true, // Indica que la respuesta es un array de viajes
  })
  @ApiNotFoundResponse({
    description: "Usuario no encontrado",
    content: {
      "application/json": {
        example: {
          statusCode: 404,
          message: "User not found",
          error: "Not Found",
        },
      },
    },
  })
  async findAll(@Param("userId") userId: string) {
    return await this.tripsService.findAll(userId);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(MultiAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Obtener todos los viajes",
    description:
      "Recupera todos los viajes con paginación. Solo accesible para usuarios con rol de administrador.",
  })
  @ApiQuery({
    name: "page",
    description: "Número de página para paginación (debe ser mayor a 0)",
    required: false,
    type: "integer",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    description: "Límite de resultados por página (debe estar entre 1 y 100)",
    required: false,
    type: "integer",
    example: 10,
  })
  @ApiOkResponse({
    description: "Todos los viajes listados correctamente",
    schema: {
      example: {
        id: "2df8f325-81d8-4a83-8740-c0e2eed554be",
        name: "Viaje #1",
        date: "2025-07-05",
        travelers: ["Pepito Torres", "Juan Perez"],
        observation: "Este viaje es para cotizar productos de China",
        createdAt: "2025-07-22T05:09:13.495Z",
        updatedAt: "2025-07-22T05:09:13.495Z",
      },
    },
    isArray: true,
  })
  @ApiForbiddenResponse({
    description: "Acceso denegado. Se requiere rol de administrador",
    content: {
      "application/json": {
        example: {
          statusCode: 403,
          message: "Forbidden resource",
          error: "Forbidden",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "No autorizado. Token inválido o no proporcionado",
    content: {
      "application/json": {
        example: {
          statusCode: 401,
          message: "Unauthorized",
          error: "Unauthorized",
        },
      },
    },
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
  @ApiOperation({
    summary: "Obtener todos los proveedores de un viaje",
    description:
      "Recupera todos los proveedores asociados a un viaje específico.",
  })
  @ApiParam({
    name: "tripId",
    description:
      "ID único del viaje para el que se quieren recuperar los proveedores",
    type: "string",
  })
  @ApiOkResponse({
    description: "Todos los proveedores listados correctamente",
    schema: {
      example: {
        id: "1777f4b6-e9c8-4c57-bb94-d7e2fd909583",
        name: "Proveedor 1",
        main_picture:
          "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
        wechat_contact: "wechat123",
        phone_number: "545454",
        address: "Calle 71 sur",
        city: "Medellin",
        gps_location: "6.2442,-75.5812",
        master_genre: "fgdfhgfhfdg",
        observation: "Proveedor confiable y puntual",
        created_at: "2025-07-22T07:05:42.222Z",
        updated_at: "2025-07-22T07:05:42.222Z",
        is_active: true,
      },
    },
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: "Viaje no encontrado",
    content: {
      "application/json": {
        example: {
          statusCode: 404,
          message: "Trip not found",
          error: "Not Found",
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: "Error interno del servidor",
    content: {
      "application/json": {
        example: {
          statusCode: 500,
          message: "Internal server error",
          error: "Internal Server Error",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "No autorizado. Token inválido o no proporcionado",
    content: {
      "application/json": {
        example: {
          statusCode: 401,
          message: "Unauthorized",
          error: "Unauthorized",
        },
      },
    },
  })
  async findAllProvidersById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProvidersById(tripId);
  }

  @Get(":tripId/products")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Obtener todos los productos de un viaje",
    description:
      "Recupera todos los productos asociados a un viaje específico.",
  })
  @ApiParam({
    name: "tripId",
    description:
      "ID único del viaje para el que se quieren recuperar los productos",
    type: "string",
  })
  @ApiOkResponse({
    description: "Todos los productos listados correctamente",
    schema: {
      example: {
        id: 1,
        categoryMaster: "electrodomesticos",
        reference: "REF12345",
        name: "Televisor 4K",
        price: "1000",
        cuantity: 10,
        color: "Rojo",
        height: 1,
        width: 5,
        depth: 3,
        manufacturing_date: "2023-10-01T05:00:00.000Z",
        quantity_per_box: 10,
        total_quantity_per_box: 100,
        total_quantity: 1000,
        own_packaging: true,
        state: "pending",
        desactivated: false,
        created_at: "2025-07-22T07:24:56.575Z",
        updated_at: "2025-07-22T07:24:56.575Z",
        tripId: "4483a0c9-817c-40cb-a12d-762744afd581",
      },
    },
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: "Viaje no encontrado",
    content: {
      "application/json": {
        example: {
          statusCode: 404,
          message: "Trip not found",
          error: "Not Found",
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: "Error interno del servidor",
    content: {
      "application/json": {
        example: {
          statusCode: 500,
          message: "Internal server error",
          error: "Internal Server Error",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "No autorizado. Token inválido o no proporcionado",
    content: {
      "application/json": {
        example: {
          statusCode: 401,
          message: "Unauthorized",
          error: "Unauthorized",
        },
      },
    },
  })
  async findAllProductsById(@Param("tripId") tripId: string) {
    return await this.tripsService.findAllProductsById(tripId);
  }
  //-------------------------------------------
  @Post(":tripId/products")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Crear producto" })
  @ApiResponse({ description: "Producto creado correctamente" })
  async createProduct(
    @Param("tripId") tripId: string,
    @Body() createProductDto: CreateProductDto,
    @Req() req: any
  ) {
    const userId = req.user?.userId;
    console.log("🧾 userId recibido del token:", userId);

    return this.tripsService.createProduct(tripId, createProductDto, userId);
  }
  //---------------------------------------------------
  @Post(":tripId/providers")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Crear proveedor" })
  @ApiResponse({ description: "Proveedor creado correctamente" })
  async createProvider(
    @Param("tripId") tripId: string,
    @Body() createProviderDto: CreateProviderDTO,
    @Req() req: any
  ) {
    const userId = req.user?.userId;
    console.log("🧾 userId desde token:", userId);
    return await this.tripsService.createProviders(
      tripId,
      createProviderDto,
      userId
    );
  }

  //--------------------------------------------------------------------------------------------
  @Post(":userId")
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Crear un nuevo viaje para un usuario",
    description: "Crea un nuevo viaje asociado al usuario especificado",
  })
  @ApiParam({
    name: "userId",
    description: "ID del usuario que crea el viaje",
    type: "string",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiBody({
    type: CreateTripDTO,
    description: "Datos del viaje a crear",
  })
  @ApiCreatedResponse({
    description: "Viaje creado correctamente",
    schema: {
      example: {
        name: "Viaje #1",
        date: "2025-07-06T00:00:00.000Z",
        travelers: ["Pepito Torres", "Juan Perez"],
        observation: "Este viaje es para cotizar productos de China",
        user: {
          id: "fc666982-aa79-4c36-96e1-6eb9d873182e",
          username: "usuario123",
          email: "usuario@mail.com",
          password:
            "$2b$10$NorBGbkd9UoOz26hEKq1neXsfwCvMYHA/BLX77gfMjrZ4kLN229..",
          admin: false,
          isActive: true,
          created_at: "2025-07-22T21:53:44.347Z",
          updated_at: "2025-07-22T21:53:44.347Z",
        },
        id: "365eee00-531b-4dd1-b5d5-17fc5ed91efd",
        createdAt: "2025-07-22T21:54:16.277Z",
        updatedAt: "2025-07-22T21:54:16.277Z",
      },
    },
  })
  @ApiNotFoundResponse({
    description: "Usuario no encontrado",
    content: {
      "application/json": {
        example: {
          statusCode: 404,
          message: "User not found",
          error: "Not Found",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Validación fallida",
    content: {
      "application/json": {
        examples: {
          nameExists: {
            summary: "Nombre de viaje ya existe",
            value: {
              statusCode: 400,
              message: "Already registered trip name",
              error: "Bad Request",
            },
          },
          invalidData: {
            summary: "Datos inválidos",
            value: {
              statusCode: 400,
              message: [
                "name should not be empty",
                "date must be a valid date",
                "budget must be a positive number",
              ],
              error: "Bad Request",
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "No autorizado",
    content: {
      "application/json": {
        example: {
          statusCode: 401,
          message: "Unauthorized",
          error: "Unauthorized",
        },
      },
    },
  })
  async create(
    @Param("userId") userId: string,
    @Body() createTripDto: CreateTripDTO
  ) {
    return await this.tripsService.create(userId, createTripDto);
  }
//--------------------------------------------------------------------------------------------
  @ApiOperation({
    summary: "Obtiene todos los viajes",
    description: "Devuelve la lista completa de viajes.",
  })
  @ApiResponse({
    status: 200,
    description: "Listado de viajes obtenido correctamente.",
  })

  @Get()
  async findAlltripsController() {
    return this.tripsService.findAllTripsService();
  }
}
