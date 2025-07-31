import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Provider } from "../providers/Entities/provider.entity";
import { CreateProviderDTO } from "../providers/dtos/create-provider.dto";
import { ProviderPicture } from "../providers/Entities/provider-pictures.entity";
import { ProviderPictureDTO } from "../providers/dtos/create-provider-picture.dto";
import { Trip } from "../trips/trip.entity";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(ProviderPicture)
    private readonly pictureRepository: Repository<ProviderPicture>
  ) {}
  // async create(createProviderDto: CreateProviderDTO): Promise<Provider> {
  //   const { pictures, tripId, ...providerData } = createProviderDto;

  //   // Buscá el viaje correspondiente
  //   const trip = await this.tripRepository.findOne({ where: { id: tripId } });
  //   if (!trip) {
  //     throw new NotFoundException('Viaje no encontrado');
  //   }

  //   // Crear el proveedor con la relación al viaje
  //   const provider = this.providerRepository.create({
  //     ...providerData,
  //     phone_number: String(createProviderDto.phone_number),
  //     trip,  // asociamos el viaje
  //   });

  //   await this.providerRepository.save(provider);

  //   if (pictures && pictures.length > 0) {
  //     const pictureEntities = pictures.map((pic) =>
  //       this.pictureRepository.create({
  //         ...pic,
  //         provider,
  //       }),
  //     );
  //     await this.pictureRepository.save(pictureEntities);
  //     provider.pictures = pictureEntities;
  //   } else {
  //     provider.pictures = [];
  //   }

  //   return provider;
  // }

  async findAll(): Promise<Provider[]> {
    return this.providerRepository.find({
      where: { is_active: true },
      relations: ["pictures"],
      order: { created_at: "DESC" },
    });
  }

  async findOne(id: string): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { id, is_active: true },
      relations: ["pictures"],
    });
    if (!provider) throw new NotFoundException("Provider not found");
    return provider;
  }

  async update(
    id: string,
    updateDto: Partial<CreateProviderDTO>
  ): Promise<Provider> {
    const provider = await this.findOne(id);

    Object.assign(provider, updateDto);
    await this.providerRepository.save(provider);

    // Aqui se actualizan las imágenes si se proporcionan (aun lo estoy pensando , no se si hacerlo desde el servicio que maneja las imágenes)
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const provider = await this.findOne(id);
    provider.is_active = false;
    await this.providerRepository.save(provider);
  }

  //Método para reactivar proveedores si es necesario
  async reactivate(id: string): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { id, is_active: false },
    });
    if (!provider) throw new NotFoundException("Provider not found");
    provider.is_active = true;
    await this.providerRepository.save(provider);
    return provider;
  }

  //-----------------------------
  async findProvidersByUser(userId: string): Promise<Provider[]> {
    return this.providerRepository.find({
      where: { userId },
    });
  }
}
