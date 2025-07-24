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
import { Product } from "../../products/entities/product.entity";
import { User } from "../users/user.entity";

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Provider)
    private readonly providersRepository: Repository<Provider>,
    @InjectRepository(ProviderPicture)
    private readonly providersPicturesRepository: Repository<ProviderPicture>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async findAll(userId: string): Promise<Trip[]> {
    const findUser = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!findUser) throw new NotFoundException("User not found");
    return await this.tripsRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getTrips(page: number, limit: number): Promise<Trip[]> {
    let trips = await this.tripsRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    trips = trips.slice(start, end);

    return trips;
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

  async createProduct(tripId: string, createProductDto: CreateProductDto) {
    console.log("Creating product for trip ID:", tripId);

    const findTrip = await this.tripsRepository.findOneBy({
      id: tripId,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    const newProduct = this.productsRepository.create({
      ...createProductDto,
      trip: findTrip,
    });

    await this.productsRepository.save(newProduct);

    return await this.tripsRepository.findOne({
      where: { id: tripId },
      relations: { products: true },
    });
  }

  async createProviders(id: string, createProviderDto: CreateProviderDTO) {
    const findTrip = await this.tripsRepository.findOneBy({
      id: id,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    const findNameProvider = await this.providersRepository.findOneBy({
      name: createProviderDto.name,
      trip: { id: id },
    });

    if (findNameProvider)
      throw new BadRequestException("Already registered provider name");

    const { pictures, ...providerData } = createProviderDto;

    const newProvider = this.providersRepository.create({
      ...providerData,
      phone_number: String(createProviderDto.phone_number),
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

  async create(userId: string, createTripDto: CreateTripDTO): Promise<Trip> {
    const findUser = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!findUser) throw new NotFoundException("User not found");

    const findNameTrip = await this.tripsRepository.findOneBy({
      name: createTripDto.name,
      user: { id: userId },
    });

    if (findNameTrip)
      throw new BadRequestException("Already registered trip name");

    const trip = await this.tripsRepository.create({
      ...createTripDto,
      date: new Date(createTripDto.date),
      user: findUser,
    });

    return await this.tripsRepository.save(trip);
  }

  async updateTrip(tripId: string, createTripDto: CreateTripDTO) {
    const findTrip = await this.tripsRepository.findOneBy({
      id: tripId,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    await this.tripsRepository.update(tripId, createTripDto);

    return createTripDto;

    // await this.tripsRepository.update(tripId, {
    //   ...createTripDto,
    //   date: new Date(createTripDto.date),
    // });
  }

  async findById(tripId: string) {
    const trip = await this.tripsRepository.findOne({
      where: { id: tripId },
      relations: { products: true, providers: true },
    });
    if (!trip) throw new NotFoundException("Trip not found");
    return trip;
  }
}
