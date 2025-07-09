import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateTripDTO {
  @ApiProperty({
    description: "Nombre del viaje",
    example: "Viaje #1",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: "Fecha del viaje",
    example: "2025-07-06",
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: "Lista de nombres de los viajeros",
    example: ["Pepito Torres", "Juan Perez"],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  travelers: string[];

  @ApiProperty({
    description: "Observacion del viaje",
    example: "Este viaje es para cotizar productos de China",
  })
  @IsOptional()
  @IsString()
  observation?: string;
}
