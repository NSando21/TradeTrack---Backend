import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto, ProductState } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { Trip } from "@/modules/trips/trip.entity";
import { UUID } from "node:crypto";
import { User } from "@/modules/users/user.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async newProductService(NewProduct: CreateProductDto) {
    try {
      const trip = await this.tripRepository.findOne({
        where: { id: NewProduct.tripId },
      });
      if (!trip) {
        throw new NotFoundException("Trip not found");
      }

      const newProduct = this.productRepository.create({
        ...NewProduct,
        trip: trip,
        tripId: trip.id,
      });

      await this.productRepository.save(newProduct);
      return "Producto creado correctamente";
    } catch (error) {
      console.error("Error en newProductService:", error);
      throw error; // para que llegue al controlador y se envíe el error al frontend
    }
  }

  async findAllProductsService(): Promise<Product[]> {
    return this.productRepository.find({
      where: { desactivated: true },
      relations: ["trip"],
    });
  }

  async findProductsByState(state?: ProductState) {
    const whereClause: any = { desactivated: false };
    if (state) {
      whereClause.state = state;
    }
    console.log("Filtro aplicado:", whereClause);
    return this.productRepository.find({ where: whereClause });
  }

  async deactivateProduct(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    product.desactivated = true;
    return this.productRepository.save(product);
  }
  //--------------------------------------------
  async findOneBy(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, is_active: true },
      relations: ["pictures"],
    });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }
  //---------------------------------------------

  async findProductsByUser(userId: string): Promise<Product[]> {
    const findUser = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!findUser) throw new NotFoundException("User not found");

    return await this.productRepository.find({
      where: { user: { id: userId } },
    });
  }

  async updateProduct(
    productId: string,
    updateProductDto: Partial<UpdateProductDto>
  ): Promise<Product> {
    const findProduct = await this.productRepository.findOne({
      where: { id: productId },
      relations: ["user"],
    });

    if (!findProduct) throw new NotFoundException("Product not found");

    Object.assign(findProduct, updateProductDto);

    findProduct.updated_at = new Date();

    await this.productRepository.save(findProduct);

    return findProduct;
  }
}
