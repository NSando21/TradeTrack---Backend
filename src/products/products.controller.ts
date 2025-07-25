import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto, ProductState } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Product } from "./entities/product.entity";
import {
  DesactivateProductByIdDoc,
  GetProductByIdDoc,
  GetProductsByStateDoc,
  GetProductsByUserIdDoc,
  GetProductsDoc,
} from "@/swagger-docs/products.docs";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @ApiOperation({
  //   summary: "Crea un nuevo producto",
  //   description: "Crea un nuevo producto con los datos proporcionados.",
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: "Producto creado exitosamente.",
  // })
  // @Post("/newProduct")
  // newProductController(@Body() NewProduct: CreateProductDto) {
  //   return this.productsService.newProductService(NewProduct);
  // }

  @Get()
  @GetProductsDoc()
  async findAllProductsController() {
    return this.productsService.findAllProductsService();
  }

  @Get("/state")
  @GetProductsByStateDoc()
  getProductsByState(@Query("state") state?: ProductState) {
    return this.productsService.findProductsByState(state);
  }

  @Patch("/:id/deactivate")
  @DesactivateProductByIdDoc()
  async deactivateProduct(@Param("id") id: string) {
    return this.productsService.deactivateProduct(id);
  }
  //------------------------------------------------------------------------------
  @Get(":id")
  @GetProductByIdDoc()
  async findOneBy(@Param("id") id: string) {
    return this.productsService.findOneBy(id);
  }
  //----------------------------
  @Get(":id/products")
  @GetProductsByUserIdDoc()
  async findProductsByUser(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.productsService.findProductsByUser(id);
  }
}
