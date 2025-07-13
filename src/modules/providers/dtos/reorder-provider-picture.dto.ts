// Este DTO solo representa una imagen a reordenar

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt } from 'class-validator';

export class ReorderProviderPictureDTO {
  @ApiProperty({
    description: 'ID de la imagen',
    example: 'UUID de la imagen',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nuevo orden de la imagen',
    example: 2,
  })
  @IsInt()
  order: number;
}
