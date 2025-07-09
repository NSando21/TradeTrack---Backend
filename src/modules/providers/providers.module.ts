import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './Entities/provider.entity';
import { ProviderPicture } from './Entities/provider-pictures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, ProviderPicture])],
  controllers: [],
  providers: [],
})
export class ProviderModule {}
