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
import { Trip } from "../../modules/trips/trip.entity";
import { User } from "@/modules/users/user.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @Column({ default: false })
  desactivated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: "uuid", nullable: true })
  tripId: string;
  //--------------------------------------
  @Column({ default: true })
  is_active: boolean;
  //----------------------------------
  @ManyToOne(() => Trip, (trip) => trip.products)
  @JoinColumn({ name: "tripId" })
  trip: Trip;

  @ManyToOne(() => User, user => user.products, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  userId?: string;
}
