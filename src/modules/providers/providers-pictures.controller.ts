import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  BadRequestException,
  Get,
} from "@nestjs/common";
import { ProviderPicturesService } from "./providers-pictures.service";
import { ProviderPictureDTO } from "./dtos/create-provider-picture.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReorderProviderPicturesDTO } from "./dtos/reorder-provider-pictures.dto";

@ApiTags("Provider Pictures")
@Controller("provider-pictures")
export class ProviderPicturesController {
  constructor(
    private readonly providerPicturesService: ProviderPicturesService
  ) {}

  @ApiOperation({
    summary: "Crea una nueva imagen para un proveedor",
    description: "Crea una nueva imagen asociada a un proveedor específico.",
  })
  @ApiResponse({
    status: 201,
    description: "La imagen ha sido creada exitosamente.",
  })
  @Post(":providerId")
  async create(
    @Param("providerId") providerId: string,
    @Body() dto: ProviderPictureDTO
  ) {
    return this.providerPicturesService.create(providerId, dto);
  }

  @ApiOperation({
    summary: "Obtiene todas las imágenes de un proveedor",
    description: "Devuelve todas las imágenes asociadas a un proveedor específico.",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de imágenes del proveedor.",
  })
  @Get(":providerId")
  async findAllByProviderId(
    @Param("providerId") providerId: string
  ) {
    return this.providerPicturesService.findAllByProviderId(providerId);
  }

  @ApiOperation({
    summary: "Elimina una imagen de un proveedor",
    description: "Elimina una imagen específica de un proveedor por su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "La imagen ha sido eliminada exitosamente.",
  })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.providerPicturesService.remove(id);
    return { message: "Picture deleted" };
  }

  

  @ApiOperation({
    summary: "Reordena las imágenes de un proveedor",
    description:
      "![Ejemplo](https://i.ibb.co/Qq29jk8/image.png)",
  })
  @ApiResponse({
    status: 200,
    description: "Orden de imágenes actualizado correctamente. (Requiere del arreglo de TODAS las imágenes existentes con sus nuevos órdenes, no puede faltar ninguna)",
  })
  @Patch("reorder/:providerId")
  async reorderPictures(
    @Param("providerId") providerId: string,
    @Body() reorderDto: ReorderProviderPicturesDTO
  ) {
    const pictures = reorderDto.pictures;
    const orders = pictures.map((pic) => pic.order);
    if (orders.length !== new Set(orders).size) {
      throw new BadRequestException(
        "No puede haber órdenes duplicados en las imágenes enviadas."
      );
    }
    await this.providerPicturesService.reorderPictures(providerId, pictures);
    return { message: "Orden de imágenes actualizado correctamente" };
  }
}
