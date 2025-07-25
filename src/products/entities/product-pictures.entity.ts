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

@Entity("product_pictures")
@Unique(["product", "order"])
export class ProductPicture {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "No image" })
  url_foto: string;

  @Column({ type: "int", nullable: true })
  order: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Product, (product) => product.pictures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product: Product;
}
