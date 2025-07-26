import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Trip } from "../trips/trip.entity";
import { Product } from "@/products/entities/product.entity";
import { Provider } from "../providers/Entities/provider.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum DniType {
  DNI = "dni",
  PASSPORT = "passport",
  CC = "c.c",
}

export enum UserRole {
  ADMIN = "admin",
  JEFE = "jefe",
  EMPLEADO = "empleado",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: "ID único del usuario",
    example: "a6996685-769b-4d58-a65b-961285be1f37",
    format: "uuid",
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: "Nombre de usuario único",
    example: "usuario123",
  })
  username: string;

  @Column()
  @ApiProperty({
    description: "Correo electrónico del usuario",
    example: "usuario@mail.com",
  })
  email: string;

  @Column()
  @ApiProperty({
    description: "Contraseña hasheada del usuario",
    example: "$2b$10$d4eWxxyUECdYfLJqv6Gg4uhOAZsWS0J7eqw0NQCpZLErL8I4jGp9S",
  })
  password: string;

  @Column({ type: "boolean", default: false })
  @ApiProperty({
    description: "Indica si el usuario es administrador",
    example: false,
    default: false,
  })
  admin: boolean;

  @Column({ type: "boolean", default: true })
  @ApiProperty({
    description: "Indica si el usuario está activo",
    example: true,
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Trip, (trip) => trip.user)
  @ApiPropertyOptional({
    type: () => [Trip],
    description: "Viajes asociados al usuario",
  })
  trips: Trip[];

  @CreateDateColumn()
  @ApiProperty({
    description: "Fecha de creación del usuario",
    example: "2025-07-26T04:49:05.247Z",
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: "Fecha de última actualización del usuario",
    example: "2025-07-26T04:49:05.247Z",
  })
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.user)
  @ApiPropertyOptional({
    type: () => [Product],
    description: "Productos creados por el usuario",
  })
  products: Product[];

  @OneToMany(() => Provider, (prov) => prov.user)
  @ApiPropertyOptional({
    type: () => [Provider],
    description: "Proveedores creados por el usuario",
  })
  providers: Provider[];

  @Column({ name: 'Image_Profile', nullable: true })
  Image_Profile?: string;
}
