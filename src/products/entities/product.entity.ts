import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
import { ProductCategory, ProductState } from "../dto/create-product.dto";
import { Trip } from "../../modules/trips/trip.entity";
import { User } from "@/modules/users/user.entity";
import { ProductPicture } from "./product-pictures.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: "ID único del producto",
    example: "123e4567-e89b-12d3-a456-426614174000",
    format: "uuid",
  })
  id: string;

  @Column()
  @ApiProperty({
    description: "Categoría principal del producto",
    enum: ProductCategory,
    example: ProductCategory.BELLEZA,
  })
  categoryMaster: ProductCategory;

  @Column()
  @ApiProperty({
    description: "Referencia o SKU del producto",
    example: "PROD-001-2023",
    maxLength: 50,
  })
  reference: string;

  @Column()
  @ApiProperty({
    description: "Nombre del producto",
    example: "Smartphone X9 Pro",
    maxLength: 100,
  })
  name: string;

  @Column("decimal")
  @ApiProperty({
    description: "Precio unitario del producto",
    example: 599.99,
    minimum: 0,
  })
  price: number;

  @Column()
  @ApiProperty({
    description: "Cantidad disponible",
    example: 50,
    minimum: 0,
  })
  cuantity: number;

  @Column()
  @ApiProperty({
    description: "Color del producto",
    example: "Negro mate",
  })
  color: string;

  @Column()
  @ApiProperty({
    description: "Altura del producto en centímetros",
    example: 15.5,
  })
  height: number;

  @Column()
  @ApiProperty({
    description: "Ancho del producto en centímetros",
    example: 7.8,
  })
  width: number;

  @Column()
  @ApiProperty({
    description: "Profundidad del producto en centímetros",
    example: 0.8,
  })
  depth: number;

  @Column()
  @ApiProperty({
    description: "Fecha de fabricación del producto",
    example: "2023-01-15",
  })
  manufacturing_date: Date;

  @Column()
  @ApiProperty({
    description: "Cantidad de unidades por caja",
    example: 10,
    minimum: 1,
  })
  quantity_per_box: number;

  @Column()
  @ApiProperty({
    description: "Cantidad total de cajas",
    example: 5,
    minimum: 0,
  })
  total_quantity_per_box: number;

  @Column()
  @ApiProperty({
    description: "Cantidad total de unidades (cajas * unidades por caja)",
    example: 50,
    minimum: 0,
  })
  total_quantity: number;

  @Column()
  @ApiProperty({
    description: "Indica si el producto usa empaque propio",
    example: false,
  })
  own_packaging: boolean;

  @Column({
    type: "enum",
    enum: ProductState,
    default: ProductState.PENDING,
  })
  @ApiProperty({
    description: "Estado actual del producto",
    enum: ProductState,
    example: ProductState.PENDING,
  })
  state: ProductState;

  @Column({ default: false })
  @ApiProperty({
    description: "Indica si el producto está desactivado",
    example: false,
    default: false,
  })
  desactivated: boolean;

  @CreateDateColumn()
  @ApiProperty({
    description: "Fecha de creación del registro",
    example: "2023-01-15T10:30:00.000Z",
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: "Fecha de última actualización",
    example: "2023-01-20T14:15:00.000Z",
  })
  updated_at: Date;

  @Column({ type: "uuid", nullable: true })
  @ApiPropertyOptional({
    description: "ID del viaje asociado (opcional)",
    example: "223e4567-e89b-12d3-a456-426614174000",
    format: "uuid",
  })
  tripId: string;

  @Column({ default: true })
  @ApiProperty({
    description: "Indica si el producto está activo",
    example: true,
    default: true,
  })
  is_active: boolean;

  @OneToMany(() => ProductPicture, (picture) => picture.product, {
    cascade: true,
  })
  pictures: ProductPicture[];

  @ManyToOne(() => Trip, (trip) => trip.products)
  @JoinColumn({ name: "tripId" })
  @ApiPropertyOptional({
    type: () => Trip,
    description: "Viaje asociado al producto",
  })
  trip: Trip;

  @ManyToOne(() => User, (user) => user.products, { nullable: false })
  @JoinColumn({ name: "userId" })
  @ApiProperty({
    type: () => User,
    description: "Usuario creador del producto",
  })
  user: User;

  @Column({ type: "uuid", nullable: true })
  @ApiPropertyOptional({
    description: "ID del usuario creador",
    example: "323e4567-e89b-12d3-a456-426614174000",
    format: "uuid",
  })
  userId?: string;
}
