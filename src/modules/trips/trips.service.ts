import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, MoreThan, Repository } from "typeorm";
import { Trip } from "./trip.entity";
import { CreateTripDTO } from "./dtos/trip.dto";
import { LessThanOrEqual } from "typeorm";
import { Provider } from "../providers/Entities/provider.entity";
import { CreateProviderDTO } from "../providers/dtos/create-provider.dto";
import { ProviderPicture } from "../providers/Entities/provider-pictures.entity";
import { CreateProductDto } from "@/products/dto/create-product.dto";
import { Product } from "@/products/entities/product.entity";
import { User } from "../users/user.entity";
import { UpdateTripDTO } from "./dtos/update-trip.dto";
import { NotificationsGateway } from "../notifications/notifications.gateway";

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    private readonly notificationsGateway: NotificationsGateway,
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

  async createProduct(
    tripId: string,
    createProductDto: CreateProductDto,
    userId: string
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        "The authenticated user could not be determined"
      );
    }

    const findTrip = await this.tripsRepository.findOneBy({ id: tripId });

    if (!findTrip) throw new NotFoundException("Trip not found");

    const newProduct = this.productsRepository.create({
      ...createProductDto,
      trip: findTrip,
      user: { id: userId }, // ← Vincula el producto con el usuario
    });

    await this.productsRepository.save(newProduct);

    return await this.tripsRepository.findOne({
      where: { id: tripId },
      relations: { products: true },
    });
  }

  async createProviders(
    tripId: string,
    createProviderDto: CreateProviderDTO,
    userId: string
  ) {
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

  async updateTrip(tripId: string, updateTripDto: UpdateTripDTO) {
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

    const updatedTrip = {
      ...findTrip,
      ...updateTripDto,
      date: updateTripDto.date ? new Date(updateTripDto.date) : findTrip.date,
      updatedAt: new Date(),
    };

    await this.tripsRepository.update(tripId, updatedTrip);

    return this.tripsRepository.findOneBy({
      id: tripId,
    });
  }

  async findById(tripId: string) {
    const trip = await this.tripsRepository.findOne({
      where: { id: tripId },
      relations: { products: true, providers: true },
    });
    if (!trip) throw new NotFoundException("Trip not found");
    return trip;
  }

  async getViajeProximo(userId: string) {
    const now = new Date ();
    const tresDiasDespues = new Date();
    tresDiasDespues.setDate(tresDiasDespues.getDate() + 3);

    return await this.tripsRepository.findOne({
      where: {
        user: { id: userId },
        date: Between(now, tresDiasDespues),
      },
      order: {
        date: "ASC",
      },
    },);
  }
}
