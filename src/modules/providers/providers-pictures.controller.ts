import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProviderPicturesService } from './providers-pictures.service';
import { ProviderPictureDTO } from './dtos/create-provider-picture.dto';

@Controller('provider-pictures')
export class ProviderPicturesController {
  constructor(private readonly providerPicturesService: ProviderPicturesService) {}

  @Post(':providerId')
  async create(
    @Param('providerId') providerId: string,
    @Body() dto: ProviderPictureDTO,
  ) {
    return this.providerPicturesService.create(providerId, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.providerPicturesService.remove(id);
    return { message: 'Picture deleted' };
  }
}
