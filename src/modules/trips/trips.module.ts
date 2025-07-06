import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./trip.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TripsModule {}
