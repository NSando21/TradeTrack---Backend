import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Nombre de usuario único",
    example: "usuario123",
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "Correo electrónico del usuario",
    example: "usuario@mail.com",
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Contraseña del usuario (sin hash)",
    example: "MiContrasenaSegura123",
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: "Indica si el usuario es administrador",
    example: false,
    default: false,
  })
  admin?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: "Indica si el usuario está activo",
    example: true,
    default: true,
  })
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "Ruta o URL de la imagen de perfil",
    example: "https://miapp.com/uploads/profile123.jpg",
  })
  Image_Profile?: string;
}
