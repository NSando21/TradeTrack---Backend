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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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

  @ApiOperation({
    summary: "Obtiene todos los productos",
    description: "Devuelve la lista completa de productos.",
  })
  @ApiResponse({
    status: 200,
    description: "Listado de productos obtenido correctamente.",
  })
  @Get()
  async findAllProductsController() {
    return this.productsService.findAllProductsService();
  }

  @ApiOperation({
    summary: "Obtiene productos por estado",
    description:
      "Filtra los productos según su estado (activo, inactivo, etc.).",
  })
  @ApiResponse({
    status: 200,
    description: "Productos filtrados por estado.",
  })
  @Get("/state")
  getProductsByState(@Query("state") state?: ProductState) {
    return this.productsService.findProductsByState(state);
  }

  @ApiOperation({
    summary: "Desactiva un producto",
    description: "Desactiva un producto por su ID (eliminación lógica).",
  })
  @ApiResponse({
    status: 200,
    description: "Producto desactivado exitosamente.",
  })
  @Patch("/:id/deactivate")
  async deactivateProduct(@Param("id") id: string) {
    return this.productsService.deactivateProduct(id);
  }
  //------------------------------------------------------------------------------
  @ApiOperation({
    summary: "Obtiene un producto por ID",
    description: "Devuelve los detalles de un producto específico por su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Detalles del producto encontrado.",
  })
  @ApiResponse({
    status: 404,
    description: "Producto no encontrado.",
  })
  @Get(":id")
  async findOneBy(@Param("id") id: string) {
    return this.productsService.findOneBy(id);
  }
  //----------------------------
  @ApiOperation({
    summary: "Obtiene todos los productos registrados por un usuario",
    description: "Devuelve los detalles de todos los productos de un usuario",
  })
  @ApiResponse({
    status: 200,
    description: "Detalles de los productos registrados por el usuario.",
  })
  @ApiResponse({
    status: 404,
    description: "usuario sin productos.",
  })
  @Get(":id/products")
  async findProductsByUser(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.productsService.findProductsByUser(id);
  }
}
