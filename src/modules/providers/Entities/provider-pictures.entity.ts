import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Unique,
} from "typeorm";
import { Provider } from "../Entities/provider.entity";

@Entity("provider_pictures")
@Unique(["provider", "order"])
export class ProviderPicture {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "No image" })
  url_foto: string;

  @Column({ type: "int", nullable: true })
  order: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Provider, (provider) => provider.pictures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "providerId" })
  provider: Provider;
}
