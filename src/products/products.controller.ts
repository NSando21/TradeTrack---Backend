import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ProductState } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/newProduct")
  newProductController(@Body() NewProduct: CreateProductDto) {
    return this.productsService.newProductService(NewProduct);
  }

  @Get("/allProducts")
  findAllProductsController() {
    return this.productsService.findAllProductsService();
  }
  @Get('/state')
  getProductsByState(@Query('state') state?: ProductState) {
    return this.productsService.findProductsByState(state);
  }
  
  @Patch('/:id/deactivate')
async deactivateProduct(@Param('id') id: number) {
  return this.productsService.deactivateProduct(id);
}

}
