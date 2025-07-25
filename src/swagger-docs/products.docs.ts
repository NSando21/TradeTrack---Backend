import {
  CreateProductDto,
  ProductState,
} from "@/products/dto/create-product.dto";
import { UpdateProductDto } from "@/products/dto/update-product.dto";
import { Product } from "@/products/entities/product.entity";
import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const GetProductsDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener todos los productos activos",
      description:
        "Devuelve la lista completa de productos activos con su información de viaje asociada.",
    }),
    ApiOkResponse({
      description: "Listado de productos obtenido correctamente",
      isArray: true, // Indica que devuelve un array
      schema: {
        example: {
          id: "d50c6ce0-0a65-4951-81f0-38881f68cced",
          name: "Viaje #1",
          date: "2025-07-05",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
          createdAt: "2025-07-25T01:51:59.505Z",
          updatedAt: "2025-07-25T01:51:59.505Z",
          products: [
            {
              id: "61d81202-dbfd-4539-b306-cadc4da9f252",
              categoryMaster: "electrodomesticos",
              reference: "REF12345",
              name: "Televisor 4K",
              price: "1000",
              cuantity: 10,
              color: "Rojo",
              height: 1,
              width: 5,
              depth: 3,
              manufacturing_date: "2023-10-01T00:00:00.000Z",
              quantity_per_box: 10,
              total_quantity_per_box: 500,
              total_quantity: 1000,
              own_packaging: true,
              state: "pending",
              desactivated: false,
              created_at: "2025-07-25T01:52:16.349Z",
              updated_at: "2025-07-25T01:52:16.349Z",
              tripId: "d50c6ce0-0a65-4951-81f0-38881f68cced",
              is_active: true,
              userId: "05955469-3983-48f3-954b-ddfe91be7ede",
            },
          ],
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: "Error interno del servidor",
      content: {
        "application/json": {
          example: {
            statusCode: 500,
            message: "Error al obtener los productos",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const GetProductsByStateDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Filtrar productos por estado",
      description:
        "Obtiene productos filtrados por estado. Si no se especifica estado, devuelve todos los productos activos.",
    }),
    ApiQuery({
      name: "state",
      description: "Estado del producto para filtrar",
      required: false,
      enum: ProductState, // Asegúrate de importar el enum ProductState
      example: ProductState.APPROVED,
    }),
    ApiOkResponse({
      description: "Lista de productos filtrados por estado",
      isArray: true,
      schema: {
        example: {
          id: "6d4f9001-0184-43f1-b2f3-1393803e8d38",
          categoryMaster: "electrodomesticos",
          reference: "REF12345",
          name: "Televisor 4K",
          price: "1000",
          cuantity: 10,
          color: "Rojo",
          height: 1,
          width: 5,
          depth: 3,
          manufacturing_date: "2023-10-01T00:00:00.000Z",
          quantity_per_box: 10,
          total_quantity_per_box: 500,
          total_quantity: 1000,
          own_packaging: true,
          state: "pending",
          desactivated: false,
          created_at: "2025-07-25T02:05:39.994Z",
          updated_at: "2025-07-25T02:05:39.994Z",
          tripId: "4f4aea9b-1c7b-4598-9d69-2b1db8a35462",
          is_active: true,
          userId: "91c7e3db-455b-4058-a6ca-196871f086cd",
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Estado de producto no válido",
      content: {
        "application/json": {
          example: {
            statusCode: 400,
            message:
              "Invalid product state. Valid values are: ACTIVE, INACTIVE, PENDING",
            error: "Bad Request",
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: "Error interno del servidor",
      content: {
        "application/json": {
          example: {
            statusCode: 500,
            message: "Error al filtrar productos por estado",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const DesactivateProductByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Desactivar un producto",
      description:
        "Realiza una eliminación lógica (soft delete) de un producto cambiando su estado a desactivado",
    }),
    ApiParam({
      name: "id",
      description: "ID del producto a desactivar",
      type: "string",
      example: "1a2b3c4d-e89b-12d3-a456-426614174000",
    }),
    ApiOkResponse({
      description: "Producto desactivado exitosamente",
      schema: {
        example: {
          id: "97bce64e-1e59-4d71-aa8a-2fe89e65850c",
          categoryMaster: "electrodomesticos",
          reference: "REF12345",
          name: "Televisor 4K",
          price: "1000",
          cuantity: 10,
          color: "Rojo",
          height: 1,
          width: 5,
          depth: 3,
          manufacturing_date: "2023-10-01T00:00:00.000Z",
          quantity_per_box: 10,
          total_quantity_per_box: 500,
          total_quantity: 1000,
          own_packaging: true,
          state: "pending",
          desactivated: true,
          created_at: "2025-07-25T02:14:06.733Z",
          updated_at: "2025-07-25T02:14:33.267Z",
          tripId: "f0da6ae5-a7ba-43bc-b41d-ad23d36ffcbb",
          is_active: true,
          userId: "b47e1ef1-a9cb-4a2a-8226-fb2d9a961019",
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Producto no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Producto con id 1a2b3c4d no encontrado",
            error: "Not Found",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "No autorizado",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Unauthorized",
            error: "Unauthorized",
          },
        },
      },
    }),
    ApiForbiddenResponse({
      description: "No tiene permisos para esta acción",
      content: {
        "application/json": {
          example: {
            statusCode: 403,
            message: "Forbidden resource",
            error: "Forbidden",
          },
        },
      },
    })
  );

export const GetProductByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener un producto por ID",
      description:
        "Devuelve los detalles completos de un producto específico incluyendo sus imágenes relacionadas. Solo devuelve productos activos.",
    }),
    ApiParam({
      name: "id",
      description: "ID único del producto a buscar",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiOkResponse({
      description: "Detalles del producto encontrado",
      type: Product,
      content: {
        "application/json": {
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Producto Premium",
            description: "Descripción detallada del producto",
            price: 299.99,
            currency: "USD",
            is_active: true,
            pictures: [
              {
                id: "223e4567-e89b-12d3-a456-426614174000",
                url: "https://example.com/product1.jpg",
                description: "Vista frontal del producto",
              },
            ],
            createdAt: "2023-01-15T10:30:00.000Z",
            updatedAt: "2023-01-20T14:15:00.000Z",
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Producto no encontrado o inactivo",
      content: {
        "application/json": {
          examples: {
            notFound: {
              summary: "Producto no existe",
              value: {
                statusCode: 404,
                message: "Product not found",
                error: "Not Found",
              },
            },
            inactive: {
              summary: "Producto inactivo",
              value: {
                statusCode: 404,
                message: "Product is not active",
                error: "Not Found",
              },
            },
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: "Error interno del servidor",
      content: {
        "application/json": {
          example: {
            statusCode: 500,
            message: "Error al obtener el producto",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const GetProductsByUserIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener productos por usuario",
      description:
        "Devuelve todos los productos registrados por un usuario específico identificado por su ID",
    }),
    ApiParam({
      name: "id",
      description: "ID único del usuario (UUID v4)",
      type: "string",
      format: "uuid",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiOkResponse({
      description: "Lista de productos del usuario",
      isArray: true,
      schema: {
        example: {
          id: "45d7133d-b573-40b8-a6b2-e80edd4d8dc0",
          categoryMaster: "electrodomesticos",
          reference: "REF12345",
          name: "Televisor 4K",
          price: "1000",
          cuantity: 10,
          color: "Rojo",
          height: 1,
          width: 5,
          depth: 3,
          manufacturing_date: "2023-10-01T00:00:00.000Z",
          quantity_per_box: 10,
          total_quantity_per_box: 500,
          total_quantity: 1000,
          own_packaging: true,
          state: "pending",
          desactivated: false,
          created_at: "2025-07-25T02:25:55.631Z",
          updated_at: "2025-07-25T02:25:55.631Z",
          tripId: "8e414fe9-6742-494a-802b-b264a6be1165",
          is_active: true,
          userId: "587eaa4f-3e01-4cb4-b22b-fd3501338c25",
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Usuario no encontrado o sin productos registrados",
      content: {
        "application/json": {
          examples: {
            noProducts: {
              summary: "Usuario sin productos",
              value: {
                statusCode: 404,
                message: "El usuario no tiene productos registrados",
                error: "Not Found",
              },
            },
            userNotFound: {
              summary: "Usuario no existe",
              value: {
                statusCode: 404,
                message: "Usuario no encontrado",
                error: "Not Found",
              },
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "ID de usuario inválido",
      content: {
        "application/json": {
          example: {
            statusCode: 400,
            message: "Validation failed (uuid is expected)",
            error: "Bad Request",
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: "Error interno del servidor",
      content: {
        "application/json": {
          example: {
            statusCode: 500,
            message: "Error al obtener los productos del usuario",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const UpdateProductByProductIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Actualizar un producto existente",
      description:
        "Actualiza parcialmente los datos de un producto existente identificado por su ID.",
    }),
    ApiParam({
      name: "productId",
      description: "ID único del producto a actualizar",
      type: "string",
      format: "uuid",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiBody({
      type: CreateProductDto,
      description: "Datos parciales del producto a actualizar",
    }),
    ApiOkResponse({
      description: "Producto actualizado exitosamente",
      type: Product,
      content: {
        "application/json": {
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Producto Actualizado",
            price: 149.99,
            color: "Azul",
            updated_at: "2023-06-20T15:30:00.000Z",
            user: {
              id: "323e4567-e89b-12d3-a456-426614174000",
              name: "Usuario Propietario",
            },
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Producto no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Product not found",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Datos de entrada inválidos",
      content: {
        "application/json": {
          example: {
            statusCode: 400,
            message: [
              "price must be a positive number",
              "color must be a string",
            ],
            error: "Bad Request",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "No autorizado",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Unauthorized",
            error: "Unauthorized",
          },
        },
      },
    }),
    ApiForbiddenResponse({
      description: "No tiene permisos para actualizar este producto",
      content: {
        "application/json": {
          example: {
            statusCode: 403,
            message: "Forbidden resource",
            error: "Forbidden",
          },
        },
      },
    })
  );
