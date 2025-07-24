import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./trip.entity";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";
import { Provider } from "../providers/Entities/provider.entity";
import { ProviderPicture } from "../providers/Entities/provider-pictures.entity";
import { Product } from "@/products/entities/product.entity";
import { User } from "../users/user.entity";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, Provider, ProviderPicture, Product, User]),
    NotificationsModule
  ],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
