import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProviderPicture } from "../Entities/provider-pictures.entity";
import { Trip } from "@/modules/trips/trip.entity";
import { User } from "@/modules/users/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity("providers")
export class Provider {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: "ID único del proveedor",
    example: "ee5c8c64-218c-4a3d-88d9-71f734ad3c35",
    format: "uuid",
  })
  id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({
    description: "Nombre del proveedor",
    example: "Proveedor 1",
    maxLength: 50,
  })
  name: string;

  @Column({ type: "text", default: "No image" })
  @ApiProperty({
    description: "URL de la imagen principal del proveedor",
    example:
      "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
    default: "No image",
  })
  main_picture: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: "Contacto de WeChat del proveedor",
    example: "wechat123",
  })
  wechat_contact: string;

  @Column({ type: "varchar", length: 20 })
  @ApiProperty({
    description: "Número de teléfono del proveedor",
    example: "545454",
    maxLength: 20,
  })
  phone_number: string;

  @Column({ type: "text" })
  @ApiProperty({
    description: "Dirección del proveedor",
    example: "Calle 71 sur",
  })
  address: string;

  @Column({ type: "varchar", length: 50 })
  @ApiProperty({
    description: "Ciudad del proveedor",
    example: "Medellin",
    maxLength: 50,
  })
  city: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: "Ubicación GPS del proveedor",
    example: "6.2442,-75.5812",
  })
  gps_location: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: "Género principal del proveedor",
    example: "fgdfhgfhfdg",
  })
  master_genre: string;

  @Column({ type: "text", nullable: true })
  @ApiPropertyOptional({
    description: "Observaciones sobre el proveedor",
    example: "Proveedor confiable y puntual",
  })
  observation: string;

  @CreateDateColumn()
  @ApiProperty({
    description: "Fecha de creación del proveedor",
    example: "2025-07-25T23:47:51.560Z",
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: "Fecha de última actualización del proveedor",
    example: "2025-07-25T23:47:51.560Z",
  })
  updated_at: Date;

  @OneToMany(() => ProviderPicture, (picture) => picture.provider, {
    cascade: true,
  })
  @ApiPropertyOptional({
    description: "Imágenes asociadas al proveedor",
    type: () => [ProviderPicture],
  })
  pictures: ProviderPicture[];

  @Column({ default: true })
  @ApiProperty({
    description: "Indica si el proveedor está activo",
    example: true,
    default: true,
  })
  is_active: boolean;

  @ManyToOne(() => Trip, (trip) => trip.providers)
  @JoinColumn({ name: "tripId" })
  @ApiPropertyOptional({
    type: () => Trip,
    description: "Viaje asociado al proveedor",
  })
  trip: Trip;

  @ManyToOne(() => User, (user) => user.providers)
  @JoinColumn({ name: "userId" })
  @ApiProperty({
    type: () => User,
    description: "Usuario creador del proveedor",
  })
  user: User;

  @Column({ type: "uuid", nullable: true })
  @ApiPropertyOptional({
    description: "ID del usuario creador",
    example: "ae017237-cfd7-4b28-9b05-79183bf74a15",
    format: "uuid",
  })
  userId: string;
}
