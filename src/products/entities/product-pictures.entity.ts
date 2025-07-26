import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Unique,
} from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity("product_pictures")
@Unique(["product", "order"])
export class ProductPicture {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: "ID único de la imagen del producto",
    example: "f7e9c1a2-1234-4bcd-8e9a-1234567890ab",
    format: "uuid",
  })
  id: string;

  @Column({ default: "No image" })
  @ApiProperty({
    description: "URL de la imagen del producto",
    example: "https://miimagen.com/producto1.jpg",
    default: "No image",
  })
  url_foto: string;

  @Column({ type: "int", nullable: true })
  @ApiPropertyOptional({
    description: "Orden de la imagen para el producto",
    example: 1,
  })
  order: number;

  @CreateDateColumn()
  @ApiProperty({
    description: "Fecha de creación de la imagen",
    example: "2025-07-26T04:49:05.247Z",
  })
  created_at: Date;

  @ManyToOne(() => Product, (product) => product.pictures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  @ApiProperty({
    type: () => Product,
    description: "Producto al que pertenece la imagen",
  })
  product: Product;
}
