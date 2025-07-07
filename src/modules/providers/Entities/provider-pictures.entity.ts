import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Provider } from '../Entities/provider.entity';

@Entity('provider_pictures')
export class ProviderPicture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url_foto: string;

  @Column({ type: 'int', nullable: true })
  order: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Provider, provider => provider.pictures, { onDelete: 'CASCADE' })
  provider: Provider;
}
