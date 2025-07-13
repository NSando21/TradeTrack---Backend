// Este dto es para el conjunto de imagenes a reordenar 

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, ArrayNotEmpty, IsArray } from 'class-validator';
import { ReorderProviderPictureDTO } from './reorder-provider-picture.dto';

export class ReorderProviderPicturesDTO {
  @ApiProperty({
    description: 'Arreglo de imágenes con su nuevo orden',
    type: [ReorderProviderPictureDTO],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReorderProviderPictureDTO)
  pictures: ReorderProviderPictureDTO[];
}
