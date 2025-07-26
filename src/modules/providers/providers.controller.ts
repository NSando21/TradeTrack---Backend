import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { ApiTags } from "@nestjs/swagger";
import { UpdateProviderDTO } from "./dtos/update-provider.dto";
import {
  GetProvidersByIdDoc,
  GetProvidersDoc,
  UpdateProvidersByIdDoc,
  DeleteProviderByIdDoc,
  ReactivateProviderByIdDoc,
  GetProvidersByUserDoc,
} from "@/swagger-docs/providers.docs";

@ApiTags("Providers")
@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: "Crea un nuevo proveedor",
  //   description: "Crea un nuevo proveedor con los detalles proporcionados.",
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: "El proveedor ha sido creado exitosamente.",
  // })
  // @UseGuards(AuthGuard("jwt"))
  // @Post()
  // async create(@Req() req: any, @Body() createProviderDto: CreateProviderDTO) {
  //   const userId = req.user.userId;

  //   return this.providersService.create({
  //     ...createProviderDto,
  //     userId,
  //   });
  // }

  @Get()
  @GetProvidersDoc()
  async findAll() {
    return this.providersService.findAll();
  }

  @Get(":id")
  @GetProvidersByIdDoc()
  async findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }

  @Patch(":id")
  @UpdateProvidersByIdDoc()
  async update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDTO
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(":id")
  @DeleteProviderByIdDoc()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string) {
    await this.providersService.remove(id);
  }

  // Aqui para reactivar proveedores eliminados lógicamente
  @Patch(":id/reactivate")
  @ReactivateProviderByIdDoc()
  async reactivate(@Param("id") id: string) {
    return this.providersService.reactivate(id);
  }
  //-----------------------------------------------------------
  @Get(":id/providers")
  @GetProvidersByUserDoc()
  async findProvidersByUser(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.providersService.findProvidersByUser(id);
  }
}
