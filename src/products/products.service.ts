import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, ProductState } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Trip } from '@/modules/trips/trip.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async newProductService(NewProduct: CreateProductDto) {
    try {
      const trip = await this.tripRepository.findOne({ where: { id: NewProduct.tripId } });
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
  

  async findAllProductsService() : Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        desactivated: false,
      },
      relations: ['trip'],
    });
    return products;
  }

  async findProductsByState(state?: ProductState) {
    const whereClause: any = { desactivated: false };
    if (state) {
      whereClause.state = state;
    }
    console.log('Filtro aplicado:', whereClause);
    return this.productRepository.find({ where: whereClause });
  }
 
  async deactivateProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
  
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
  
    product.desactivated = true;
    return this.productRepository.save(product);
  }
  

  




















}
