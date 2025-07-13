import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';


export enum ProductState {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}

export class CreateProductDto {
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
  @Transform(({ value }) => value === '' ? undefined : value)
  state?: ProductState = ProductState.PENDING;
  

  @IsNotEmpty()
  @IsBoolean()
  desactivated: boolean;
}

