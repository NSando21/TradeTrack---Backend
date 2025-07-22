import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductCategory, ProductState } from "../dto/create-product.dto";
import { Trip } from '../../modules/trips/trip.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryMaster: ProductCategory;

  @Column()
  reference: string;

  @Column()
  name: string;

  @Column("decimal")
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
    type: "enum",
    enum: ProductState,
    default: ProductState.PENDING,
  })
  state: ProductState;

  @Column({ default: true })
  desactivated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: "uuid", nullable: true })
  tripId: string;

  @ManyToOne(() => Trip, (trip) => trip.products, { nullable: true })
  @JoinColumn({ name: "tripId" })
  trip: Trip;
}
