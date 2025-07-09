import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderPicture } from "./Entities/provider-pictures.entity";
import { Provider } from "./Entities/provider.entity";
import { ProviderPictureDTO } from "./dtos/create-provider-picture.dto";

@Injectable()
export class ProviderPicturesService {
  constructor(
    @InjectRepository(ProviderPicture)
    private readonly pictureRepository: Repository<ProviderPicture>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>
  ) {}

  async create(
    providerId: string,
    dto: ProviderPictureDTO
  ): Promise<ProviderPicture> {
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

  async remove(pictureId: string): Promise<void> {
    const result = await this.pictureRepository.delete(pictureId);
    if (result.affected === 0) throw new NotFoundException("Picture not found");
  }
}
