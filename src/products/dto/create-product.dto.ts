import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ProductPictureDTO } from "./create-product-picture.dto";

export enum ProductState {
  PENDING = "pending",
  APPROVED = "approved",
  CANCELLED = "cancelled",
}

export enum ProductCategory {
  ELECTRODOMESTICOS = "electrodomesticos",
  TECNOLOGIA = "tecnologia",
  MUEBLES = "muebles",
  ROPA = "ropa",
  JUGUETES = "juguetes",
  HERRAMIENTAS = "herramientas",
  HOGAR = "hogar",
  DEPORTES = "deportes",
  LIBROS = "libros",
  BELLEZA = "belleza",
}

export class CreateProductDto {
  @ApiProperty({
    description: "Categoria del producto",
    example: "electrodomesticos",
  })
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  categoryMaster: ProductCategory;

  @ApiProperty({
    description: "Referencia del producto",
    example: "REF12345",
  })
  @IsNotEmpty()
  @IsString()
  reference: string;

  @ApiProperty({
    description: "Nombre del producto",
    example: "Televisor 4K",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Foto principal del producto",
    example:
      "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  main_picture?: string;

  @ApiProperty({
    description: "Fotos adicionales del producto",
    type: [ProductPictureDTO],
    example: [{ url_foto: "https://miimagen.com/extra4.jpg", order: 1 }],
    //required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPictureDTO)
  pictures?: ProductPictureDTO[];

  @ApiProperty({
    description: "Precio del producto",
    example: "1000.00",
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: "Cantidad del producto",
    example: "10",
  })
  @IsNotEmpty()
  @IsNumber()
  cuantity: number;

  @ApiProperty({
    description: "Color del producto",
    example: "Rojo",
  })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({
    description: "Peso del producto",
    example: "1",
  })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({
    description: "Ancho del producto",
    example: "5",
  })
  @IsNotEmpty()
  @IsNumber()
  width: number;

  @ApiProperty({
    description: "Profundidad del producto",
    example: "3",
  })
  @IsNotEmpty()
  @IsNumber()
  depth: number;

  @ApiProperty({
    description: "Fecha de fabricacion del producto",
    example: "2023-10-01",
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  manufacturing_date: Date;

  @ApiProperty({
    description: "cantidad por caja del producto",
    example: "10",
  })
  @IsNotEmpty()
  @IsNumber()
  quantity_per_box: number;

  @ApiProperty({
    description: "Cantidad total por caja del producto",
    example: "500",
  })
  @IsNotEmpty()
  @IsNumber()
  total_quantity_per_box: number;

  @ApiProperty({
    description: "Cantidad total del producto",
    example: "1000",
  })
  @IsNotEmpty()
  @IsNumber()
  total_quantity: number;

  @ApiProperty({
    description: "¿El producto tiene empaque propio?",
    example: "true",
  })
  @IsNotEmpty()
  @IsBoolean()
  own_packaging: boolean;

  @ApiProperty({
    description: "state del producto",
    example: "pending",
  })
  @IsOptional()
  @IsEnum(ProductState)
  @Transform(({ value }) => (value === "" ? undefined : value))
  state?: ProductState = ProductState.PENDING;

  @ApiProperty({
    description: "¿El producto esta desactivado?",
    example: "false",
  })
  @IsNotEmpty()
  @IsBoolean()
  desactivated: boolean;

  @ApiProperty({
    description: "ID del viaje asociado",
    example: "a089d81c-4075-484c-b41a-2164521159be",
  })
  @IsUUID()
  tripId: string;
  //---------------------------------------
  @IsUUID()
  @IsOptional()
  userId: string;
}
