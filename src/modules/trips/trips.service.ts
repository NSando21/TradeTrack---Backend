import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';
import { CreateTripDTO } from './dtos/trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  async findAll(): Promise<Trip[]> {
    return this.tripsRepository.find();
  }

  async create(createTripDto: CreateTripDTO): Promise<Trip> {
    const findNameTrip = await this.tripsRepository.findOneBy({
      name: createTripDto.name,
    });

    if (findNameTrip)
      throw new BadRequestException('Already registered trip name');

    const trip = this.tripsRepository.create({
      ...createTripDto,
      date: new Date(createTripDto.date),
    });

    return await this.tripsRepository.save(trip);
  }
}
