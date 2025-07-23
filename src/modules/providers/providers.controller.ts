import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { CreateProviderDTO } from "./dtos/create-provider.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateProviderDTO } from "./dtos/update-provider.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Providers")
@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: "Crea un nuevo proveedor",
    description: "Crea un nuevo proveedor con los detalles proporcionados.",
  })
  @ApiResponse({
    status: 201,
    description: "El proveedor ha sido creado exitosamente.",
  })
  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(@Req() req: any, @Body() createProviderDto: CreateProviderDTO) {
    const userId = req.user.userId;

    return this.providersService.create({
      ...createProviderDto,
      userId,
    });
  }

  @ApiOperation({
    summary: "Obtiene todos los proveedores activos",
    description: "Devuelve una lista de todos los proveedores activos.",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de proveedores activos.",
  })
  @Get()
  async findAll() {
    return this.providersService.findAll();
  }

  @ApiOperation({
    summary: "Obtiene un proveedor por ID",
    description: "Devuelve los detalles de un proveedor específico por su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Detalles del proveedor encontrado.",
  })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }

  @ApiOperation({
    summary: "Actualiza un proveedor existente",
    description: "Actualiza los detalles de un proveedor específico por su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "El proveedor ha sido actualizado exitosamente.",
  })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDTO
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @ApiOperation({
    summary: "Elimina un proveedor",
    description:
      "Elimina un proveedor específico por su ID. (Logicamente no lo elimina, sino que lo desactiva)",
  })
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string) {
    await this.providersService.remove(id);
  }

  @ApiOperation({
    summary: "Reactiva un proveedor eliminado lógicamente",
    description:
      "Reactiva un proveedor que ha sido eliminado lógicamente por su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "El proveedor ha sido reactivado exitosamente.",
  })
  // Aqui para reactivar proveedores eliminados lógicamente
  @Patch(":id/reactivate")
  async reactivate(@Param("id") id: string) {
    return this.providersService.reactivate(id);
  }
  //-----------------------------------------------------------
  @ApiOperation({
    summary: "Obtiene todos los proveedores registrados por un usuario",
    description:
      "obtiene todos los proveedores que el usuario registro.",
  })
  @ApiResponse({
    status: 200,
    description: "lista de todos provedores registrados por user.",
  })
  @Get(":id/providers")
  async findProvidersByUser(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.providersService.findProvidersByUser(id);
  }
}
