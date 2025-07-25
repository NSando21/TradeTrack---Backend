import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class ProductPictureDTO {
  @ApiProperty({
    description: "URL de la imagen adicional del producto",
    example: "https://miimagen.com/foto1.jpg",
  })
  @IsString()
  @IsNotEmpty()
  url_foto: string;

  @ApiProperty({
    description: "Orden de la imagen (opcional)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
