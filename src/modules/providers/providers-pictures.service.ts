import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ProviderPicture } from "./Entities/provider-pictures.entity";
import { Provider } from "./Entities/provider.entity";
import { ProviderPictureDTO } from "./dtos/create-provider-picture.dto";

@Injectable()
export class ProviderPicturesService {
  constructor(
    @InjectRepository(ProviderPicture)
    private readonly pictureRepository: Repository<ProviderPicture>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectDataSource()
    private readonly dataSource: DataSource // Necesitado para el reordenamiento de imagenes 
  ) {}

  async create(
    providerId: string,
    dto: ProviderPictureDTO
  ): Promise<ProviderPicture> {
    const exists = await this.pictureRepository.findOne({
      where: { provider: { id: providerId }, order: dto.order },
    });

    if (exists) {
      throw new BadRequestException(
        `Ya existe una imagen con el orden ${dto.order} para este proveedor.`
      );
    }

    const provider = await this.providerRepository.findOne({
      where: { id: providerId, is_active: true },
    });
    if (!provider) throw new NotFoundException("Provider not found");

    const picture = this.pictureRepository.create({
      ...dto,
      provider,
    });
    return this.pictureRepository.save(picture);
  }

  async findAllByProviderId(providerId: string): Promise<ProviderPicture[]> {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId, is_active: true },
      relations: ["pictures"],
    });
    if (!provider) throw new NotFoundException("Provider not found");

    return provider.pictures;
  }


  async remove(pictureId: string): Promise<void> {
    const result = await this.pictureRepository.delete(pictureId);
    if (result.affected === 0) throw new NotFoundException("Picture not found");
  }

  async reorderPictures(
    providerId: string,
    pictures: { id: string; order: number }[]
  ): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      // Paso 1: Asignar valores temporales únicos
      for (let i = 0; i < pictures.length; i++) {
        await manager.update(
          ProviderPicture,
          { id: pictures[i].id, provider: { id: providerId } },
          { order: -(i + 1) }
        );
      }

      // Paso 2: Asignar el nuevo orden definitivo
      for (const pic of pictures) {
        await manager.update(
          ProviderPicture,
          { id: pic.id, provider: { id: providerId } },
          { order: pic.order }
        );
      }
    });
  }
}
