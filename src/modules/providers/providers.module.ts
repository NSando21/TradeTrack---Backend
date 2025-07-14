import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './Entities/provider.entity';
import { ProviderPicture } from './Entities/provider-pictures.entity';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { ProviderPicturesService } from './providers-pictures.service';
import { ProviderPicturesController } from './providers-pictures.controller';
import { Trip } from '../trips/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, ProviderPicture, Trip])],
  controllers: [ProvidersController, ProviderPicturesController],
  providers: [ProvidersService, ProviderPicturesService],  
})
export class ProviderModule {}
