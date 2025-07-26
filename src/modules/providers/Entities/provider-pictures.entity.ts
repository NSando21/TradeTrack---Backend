import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Unique,
} from "typeorm";
import { Provider } from "../Entities/provider.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity("provider_pictures")
@Unique(["provider", "order"])
export class ProviderPicture {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: "ID único de la imagen del proveedor",
    example: "be0859ef-cc00-47d4-b7b2-338bff6fbea6",
    format: "uuid",
  })
  id: string;

  @Column({ default: "No image" })
  @ApiProperty({
    description: "URL de la imagen",
    example: "https://miimagen.com/extra4.jpg",
    default: "No image",
  })
  url_foto: string;

  @Column({ type: "int", nullable: true })
  @ApiPropertyOptional({
    description: "Orden de la imagen para el proveedor",
    example: 1,
  })
  order: number;

  @CreateDateColumn()
  @ApiProperty({
    description: "Fecha de creación de la imagen",
    example: "2025-07-25T23:47:51.574Z",
  })
  created_at: Date;

  @ManyToOne(() => Provider, (provider) => provider.pictures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "providerId" })
  @ApiProperty({
    type: () => Provider,
    description: "Proveedor al que pertenece la imagen",
  })
  provider: Provider;
}
