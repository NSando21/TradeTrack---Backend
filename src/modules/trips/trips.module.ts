import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./trip.entity";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";
import { Provider } from "../providers/Entities/provider.entity";
import { ProviderPicture } from "../providers/Entities/provider-pictures.entity";
import { Product } from "@/products/entities/product.entity";
import { User } from "../users/user.entity";
import { ProductPicture } from "@/products/entities/product-pictures.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Trip,
      Provider,
      ProviderPicture,
      Product,
      User,
      ProductPicture,
    ]),
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
