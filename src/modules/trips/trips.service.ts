import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
import { User } from "../users/user.entity";
import { UpdateTripDTO } from "./dtos/update-trip.dto";
import { ProductPicture } from "@/products/entities/product-pictures.entity";

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
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductPicture)
    private readonly productsPicturesRepository: Repository<ProductPicture>
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

  async getTrips(): Promise<Trip[]> {
    return await this.tripsRepository.find({
      order: { createdAt: "DESC" },
    });
  }
  // async getTrips(page: number, limit: number): Promise<Trip[]> {
  //   let trips = await this.tripsRepository.find();

  //   const start = (page - 1) * limit;
  //   const end = start + limit;

  //   trips = trips.slice(start, end);

  //   return trips;
  // }

  async findAllProvidersById(tripId: string): Promise<Provider[]> {
    const findTrip = await this.tripsRepository.findOneBy({
      id: tripId,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    return await this.providersRepository.find({
      where: { trip: { id: tripId } },
    });
  }

  async findAllProductsById(tripId: string): Promise<Product[]> {
    const findTrip = await this.tripsRepository.findOneBy({
      id: tripId,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    return await this.productsRepository.find({
      where: { trip: { id: tripId } },
    });
  }

  async createProduct(
    tripId: string,
    createProductDto: CreateProductDto,
    userId: string
  ): Promise<Trip> {
    if (!userId) {
      throw new UnauthorizedException(
        "The authenticated user could not be determined"
      );
    }

    const findTrip = await this.tripsRepository.findOneBy({ id: tripId });

    if (!findTrip) throw new NotFoundException("Trip not found");

    const { pictures, ...productData } = createProductDto;

    const newProduct = this.productsRepository.create({
      ...productData,
      trip: findTrip,
      user: { id: userId }, // ← Vincula el producto con el usuario
    });

    const savedProduct = await this.productsRepository.save(newProduct);

    if (pictures && pictures.length > 0) {
      const pictureEntities = pictures.map((pic) =>
        this.productsPicturesRepository.create({
          ...pic,
          product: savedProduct,
        })
      );

      await this.productsPicturesRepository.save(pictureEntities);
    }

    return await this.tripsRepository.findOne({
      where: { id: tripId },
      relations: { products: { pictures: true } },
    });
  }

  async createProviders(
    tripId: string,
    createProviderDto: CreateProviderDTO,
    userId: string
  ): Promise<Trip> {
    const findTrip = await this.tripsRepository.findOneBy({
      id: tripId,
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    const findNameProvider = await this.providersRepository.findOneBy({
      name: createProviderDto.name,
      trip: { id: tripId },
    });

    if (findNameProvider)
      throw new BadRequestException("Already registered provider name");

    const { pictures, ...providerData } = createProviderDto;

    const newProvider = this.providersRepository.create({
      ...providerData,
      phone_number: String(createProviderDto.phone_number),
      trip: findTrip,
      user: { id: userId },
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
      where: { id: tripId },
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

  async updateTrip(
    tripId: string,
    updateTripDto: Partial<UpdateTripDTO>
  ): Promise<Trip> {
    const findTrip = await this.tripsRepository.findOne({
      where: { id: tripId },
      relations: ["user"],
    });

    if (!findTrip) throw new NotFoundException("Trip not found");

    if (updateTripDto.name && updateTripDto.name !== findTrip.name) {
      const existingTrip = await this.tripsRepository.findOne({
        where: {
          name: updateTripDto.name,
          user: { id: findTrip.user.id },
        },
      });

      if (existingTrip) {
        throw new BadRequestException("Trip name already exists for this user");
      }
    }

    Object.assign(findTrip, updateTripDto);

    if (updateTripDto.date) {
      findTrip.date = new Date(updateTripDto.date);
    }

    findTrip.updatedAt = new Date();

    await this.tripsRepository.save(findTrip);

    return findTrip;
  }

  async findById(tripId: string): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { id: tripId },
      relations: { products: true, providers: true },
    });
    if (!trip) throw new NotFoundException("Trip not found");
    return trip;
  }
}
