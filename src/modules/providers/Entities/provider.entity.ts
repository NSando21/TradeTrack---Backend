import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProviderPicture } from '../Entities/provider-pictures.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  main_picture: string;

  @Column({ nullable: true })
  wechat_contact: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  gps_location: string;

  @Column({ nullable: true })
  master_genre: string;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProviderPicture, picture => picture.provider, { cascade: true })
  pictures: ProviderPicture[];
  
}
