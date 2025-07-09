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
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDTO } from './dtos/create-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Body() createProviderDto: CreateProviderDTO) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  async findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProviderDto: Partial<CreateProviderDTO>,
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.providersService.remove(id);
  }

  // Aqui para reactivar proveedores eliminados lógicamente
  @Patch(':id/reactivate')
  async reactivate(@Param('id') id: string) {
    return this.providersService.reactivate(id);
  }
}
