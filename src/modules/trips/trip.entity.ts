import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../users/user.entity";
import { Provider } from "../providers/Entities/provider.entity";
import { Product } from "../../products/entities/product.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity("trips")
export class Trip {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: "ID único del viaje",
    example: "b1c2d3e4-f5a6-7890-abcd-1234567890ef",
    format: "uuid",
  })
  id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({
    description: "Nombre del viaje",
    example: "Viaje a China Julio 2025",
    maxLength: 50,
  })
  name: string;

  @Column({ type: "date", nullable: false })
  @ApiProperty({
    description: "Fecha del viaje",
    example: "2025-07-25",
    type: String,
    format: "date",
  })
  date: Date;

  @Column("text", { array: true, nullable: false })
  @ApiProperty({
    description: "Lista de viajeros (nombres o identificadores)",
    example: ["Juan Pérez", "Ana Gómez", "Pedro Ruiz"],
    type: [String],
  })
  travelers: string[];

  @Column({ type: "text", default: "No obseervation" })
  @ApiPropertyOptional({
    description: "Observaciones sobre el viaje",
    example: "Viaje de negocios para visitar proveedores.",
    default: "No obseervation",
  })
  observation: string;

  @CreateDateColumn()
  @ApiProperty({
    description: "Fecha de creación del registro del viaje",
    example: "2025-07-25T23:47:51.560Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: "Fecha de última actualización del viaje",
    example: "2025-07-26T10:15:00.000Z",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.trips)
  @JoinColumn({ name: "userId" })
  @ApiProperty({
    type: () => User,
    description: "Usuario creador del viaje",
  })
  user: User;

  @OneToMany(() => Provider, (provider) => provider.trip)
  @ApiPropertyOptional({
    type: () => [Provider],
    description: "Proveedores asociados a este viaje",
  })
  providers: Provider[];

  @OneToMany(() => Product, (product) => product.trip)
  @ApiPropertyOptional({
    type: () => [Product],
    description: "Productos asociados a este viaje",
  })
  products: Product[];
}
