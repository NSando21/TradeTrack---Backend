import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trip } from '../trips/trip.entity';

export enum DniType {
  DNI = 'dni',
  PASSPORT = 'passport',
  CC = 'c.c',
}

export enum AuthProvider {
  FACEBOOK = 'FB',
  GOOGLE = 'google',
  PASSWORD = 'pass',
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

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: DniType,
  })
  dni: DniType;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
  })
  auth: AuthProvider;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  rol: UserRole;

  @Column({ default: false })
  approved: boolean;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
