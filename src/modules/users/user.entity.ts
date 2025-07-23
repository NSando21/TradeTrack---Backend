import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trip } from '../trips/trip.entity';
import { Product } from '@/products/entities/product.entity';
import { Provider } from '../providers/Entities/provider.entity';

export enum DniType {
  DNI = 'dni',
  PASSPORT = 'passport',
  CC = 'c.c',
}

export enum UserRole {
  ADMIN = 'admin',
  JEFE = 'jefe',
  EMPLEADO = 'empleado',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
//-----------------------------------------------------------------------------------------------------------------
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Provider, (prov) => prov.user)
  providers: Provider[];
}
