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
import {
  CreateProviderPictureDoc,
  GetProviderPicturesByProviderIdDoc,
  DeleteProviderPictureDoc,
  ReorderProviderPicturesDoc,
} from "@/swagger-docs/providers-pictures.docs";

@ApiTags("Provider Pictures")
@Controller("provider-pictures")
export class ProviderPicturesController {
  constructor(
    private readonly providerPicturesService: ProviderPicturesService
  ) {}

  @CreateProviderPictureDoc()
  @Post(":providerId")
  async create(
    @Param("providerId") providerId: string,
    @Body() dto: ProviderPictureDTO
  ) {
    return this.providerPicturesService.create(providerId, dto);
  }

  @GetProviderPicturesByProviderIdDoc()
  @Get(":providerId")
  async findAllByProviderId(@Param("providerId") providerId: string) {
    return this.providerPicturesService.findAllByProviderId(providerId);
  }

  @DeleteProviderPictureDoc()
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.providerPicturesService.remove(id);
    return { message: "Picture deleted" };
  }

  @ReorderProviderPicturesDoc()
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
