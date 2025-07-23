import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

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
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  categoryMaster: ProductCategory;

  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  cuantity: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  depth: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  manufacturing_date: Date;

  @IsNotEmpty()
  @IsNumber()
  quantity_per_box: number;

  @IsNotEmpty()
  @IsNumber()
  total_quantity_per_box: number;

  @IsNotEmpty()
  @IsNumber()
  total_quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  own_packaging: boolean;

  @IsOptional()
  @IsEnum(ProductState)
  @Transform(({ value }) => (value === "" ? undefined : value))
  state?: ProductState = ProductState.PENDING;

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
