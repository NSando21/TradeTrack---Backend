import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trip } from '../trips/trip.entity';

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

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
