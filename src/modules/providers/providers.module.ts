import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './Entities/provider.entity';
import { ProviderPicture } from './Entities/provider-pictures.entity';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { ProviderPicturesService } from './providers-pictures.service';
import { ProviderPicturesController } from './providers-pictures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, ProviderPicture])],
  controllers: [ProvidersController, ProviderPicturesController],
  providers: [ProvidersService, ProviderPicturesService],  
})
export class ProviderModule {}
