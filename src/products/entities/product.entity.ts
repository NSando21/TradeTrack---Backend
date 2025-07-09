import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductState } from "../dto/create-product.dto";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  cuantity: number;

  @Column()
  color: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  depth: number;

  @Column()
  manufacturing_date: Date;

  @Column()
  quantity_per_box: number;

  @Column()
  total_quantity_per_box: number;

  @Column()
  total_quantity: number;

  @Column()
  own_packaging: boolean;

  @Column({
    type: 'enum',
    enum: ProductState,
    default: ProductState.PENDING,
  })
  state: ProductState;

  @Column({ default: false })
  desactivated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
