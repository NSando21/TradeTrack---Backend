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

@Entity("trips")
export class Trip {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column("text", { array: true, nullable: false })
  travelers: string[];

  @Column({ type: "text", default: "No obseervation" })
  observation: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.trips)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Provider, (provider) => provider.trip)
  providers: Provider[];

  @OneToMany(() => Product, (product) => product.trip)
  products: Product[];
}
