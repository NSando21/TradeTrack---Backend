import { PartialType, ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  MaxLength,
  IsDateString,
  IsString,
  MinLength,
  IsArray,
  ArrayMinSize,
} from "class-validator";
import { CreateTripDTO } from "./trip.dto";

export class UpdateTripDTO extends PartialType(CreateTripDTO) {
  @ApiProperty({
    description: "Nombre del viaje",
    required: false,
    example: "Viaje a Barcelona Modificado",
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiProperty({
    description: "Fecha del viaje (formato YYYY-MM-DD)",
    required: false,
    example: "2023-08-20",
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    description: "Lista de nombres de los viajeros",
    required: false,
    example: ["Pepito Torres", "Juan Perez"],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  travelers?: string[];

  @ApiProperty({
    description: "Observacion del viaje",
    required: false,
    example: "Este viaje es para cotizar productos de China",
  })
  @IsOptional()
  @IsString()
  observation?: string;
}
