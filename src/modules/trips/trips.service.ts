import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trip } from "./trip.entity";
import { CreateTripDTO } from "./dtos/trip.dto";

import { Provider } from "../providers/Entities/provider.entity";
import { CreateProviderDTO } from "../providers/dtos/create-provider.dto";
import { ProviderPicture } from "../providers/Entities/provider-pictures.entity";
import { CreateProductDto } from "@/products/dto/create-product.dto";
import { Product } from "@/products/entities/product.entity";

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Provider)
    private readonly providersRepository: Repository<Provider>,
    @InjectRepository(ProviderPicture)
    private readonly providersPicturesRepository: Repository<ProviderPicture>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async findAll(): Promise<Trip[]> {
    return this.tripsRepository.find();
  }

  async findAllProvidersById(tripId: string) {
    const findTrip = await this.tripsRepository.findOneBy({
      id: tripId,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    return await this.providersRepository.find({
      where: { trip: { id: tripId } },
    });
  }

  async findAllProductsById(tripId: string) {
    const findTrip = await this.tripsRepository.findOneBy({
      id: tripId,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    return await this.productsRepository.find({
      where: { trip: { id: tripId } },
    });
  }

  async createProduct(id: string, createProductDto: CreateProductDto) {
    const findTrip = await this.tripsRepository.findOneBy({
      id: id,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    const newProduct = this.productsRepository.create({
      ...createProductDto,
      trip: findTrip,
    });

    await this.productsRepository.save(newProduct);

    return await this.tripsRepository.findOne({
      where: { id },
      relations: { products: true },
    });
  }

  async createProviders(id: string, createProviderDto: CreateProviderDTO) {
    const findTrip = await this.tripsRepository.findOneBy({
      id: id,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    const { pictures, ...providerData } = createProviderDto;

    const newProvider = this.providersRepository.create({
      ...providerData,
      phone_number: String(createProviderDto.phone_number), // Se tiene que asegurar que sea un string debido a que los numeros de teléfono pueden contener caracteres especiales como '+' o '-'
      trip: findTrip,
    });

    const savedProvider = await this.providersRepository.save(newProvider);

    if (pictures && pictures.length > 0) {
      const pictureEntities = pictures.map((pic) =>
        this.providersPicturesRepository.create({
          ...pic,
          provider: savedProvider,
        })
      );

      await this.providersPicturesRepository.save(pictureEntities);
    }

    return await this.tripsRepository.findOne({
      where: { id },
      relations: { providers: { pictures: true } },
    });
  }

  async create(createTripDto: CreateTripDTO): Promise<Trip> {
    const findNameTrip = await this.tripsRepository.findOneBy({
      name: createTripDto.name,
    });

    if (findNameTrip)
      throw new BadRequestException("Already registered trip name");

    const trip = this.tripsRepository.create({
      ...createTripDto,
      date: new Date(createTripDto.date),
    });

    return await this.tripsRepository.save(trip);
  }

  async findById(id: string) {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: { products: true, providers: true },
    });
    if (!trip) throw new NotFoundException("Trip not found");
    return trip;
  }
}
