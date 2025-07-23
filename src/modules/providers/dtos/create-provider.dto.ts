import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { ProviderPictureDTO } from "./create-provider-picture.dto";

export class CreateProviderDTO {
  @ApiProperty({
    description: "Nombre del proveedor",
    example: "Proveedor 1",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: "Foto principal del proveedor",
    example:
      "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  main_picture?: string;

  @ApiProperty({
    description: "Fotos adicionales del proveedor",
    type: [ProviderPictureDTO],
    example: [{ url_foto: "https://miimagen.com/extra4.jpg", order: 1 }],
    //required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProviderPictureDTO)
  pictures?: ProviderPictureDTO[];

  @ApiProperty({
    description: "Wechat del proveedor",
    example: "wechat123",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  wechat_contact: string;

  @ApiProperty({
    description: "Numero celular del proveedor",
    example: "545454",
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: "Direccion del proveedor",
    example: "Calle 71 sur",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  address: string;

  @ApiProperty({
    description: "Ciudad del proveedor",
    example: "Medellin",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  city: string;

  @ApiProperty({
    description: "Cordeenadas del proveedor",
    example: "6.2442,-75.5812",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  gps_location: string;

  @ApiProperty({
    description: "No se que es esto",
    example: "fgdfhgfhfdg",
  })
  @IsString()
  @MinLength(3)
  master_genre: string;

  @ApiProperty({
    description: "Observación general del proveedor",
    example: "Proveedor confiable y puntual",
  })
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty({
    description: "ID del viaje al que pertenece el proveedor",
    example: "a089d81c-4075-484c-b41a-2164521159be",
  })
  @IsUUID()
  tripId: string;
  //----------------------------------
  @IsUUID()
  @IsOptional()
  userId: string;
}
