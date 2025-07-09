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

@Entity("providers")
export class Provider {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "text", default: "No image" })
  main_picture: string;

  @Column({ nullable: true })
  wechat_contact: string;

  @Column({ type: "varchar", length: 20 })
  phone_number: string;

  @Column({ type: "text" })
  address: string;

  @Column({ type: "varchar", length: 50 })
  city: string;

  @Column({ nullable: true })
  gps_location: string;

  @Column({ nullable: true })
  master_genre: string;

  @Column({ type: "text", nullable: true })
  observation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProviderPicture, (picture) => picture.provider, {
    cascade: true,
  })
  pictures: ProviderPicture[];

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Trip, (trip) => trip.providers)
  @JoinColumn({ name: "tripId" })
  trip: Trip;
}
