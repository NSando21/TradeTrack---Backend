import { CreateProviderDTO } from "@/modules/providers/dtos/create-provider.dto";
import { CreateTripDTO } from "@/modules/trips/dtos/trip.dto";
import { CreateProductDto } from "@/products/dto/create-product.dto";
import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiBody,
} from "@nestjs/swagger";

export const GetTripByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener viaje por ID del viaje",
      description:
        "Recupera los detalles completos de un viaje específico incluyendo sus productos y proveedores relacionados.",
    }),
    ApiParam({
      name: "tripId",
      description: "ID único del viaje a recuperar",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiOkResponse({
      description: "Viaje obtenido correctamente",
      schema: {
        example: {
          id: "2df8f325-81d8-4a83-8740-c0e2eed554be",
          name: "Viaje #1",
          date: "2025-07-05",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
          createdAt: "2025-07-22T05:09:13.495Z",
          updatedAt: "2025-07-22T05:09:13.495Z",
          products: [],
          providers: [],
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Viaje no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Trip not found",
            error: "Not Found",
          },
        },
      },
    })
  );

export const GetTripByUserIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener todos los viajes por ID del usuario",
      description:
        "Recupera todos los viajes asociados a un usuario específico.",
    }),
    ApiParam({
      name: "userId",
      description: "ID único del usuario cuyos viajes se quieren recuperar",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiOkResponse({
      description: "Todos los viajes listados correctamente",
      schema: {
        example: {
          id: "2df8f325-81d8-4a83-8740-c0e2eed554be",
          name: "Viaje #1",
          date: "2025-07-05",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
          createdAt: "2025-07-22T05:09:13.495Z",
          updatedAt: "2025-07-22T05:09:13.495Z",
        },
      },
      isArray: true,
    }),
    ApiNotFoundResponse({
      description: "Usuario no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "User not found",
            error: "Not Found",
          },
        },
      },
    })
  );

export const GetTripsDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener todos los viajes",
      description:
        "Recupera todos los viajes con paginación. Solo accesible para usuarios con rol de administrador.",
    }),
    // @ApiQuery({
    //   name: "page",
    //   description: "Número de página para paginación (debe ser mayor a 0)",
    //   required: false,
    //   type: "integer",
    //   example: 1,
    // })
    // @ApiQuery({
    //   name: "limit",
    //   description: "Límite de resultados por página (debe estar entre 1 y 100)",
    //   required: false,
    //   type: "integer",
    //   example: 10,
    // })
    ApiOkResponse({
      description: "Todos los viajes listados correctamente",
      schema: {
        example: {
          id: "2df8f325-81d8-4a83-8740-c0e2eed554be",
          name: "Viaje #1",
          date: "2025-07-05",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
          createdAt: "2025-07-22T05:09:13.495Z",
          updatedAt: "2025-07-22T05:09:13.495Z",
        },
      },
      isArray: true,
    }),
    ApiForbiddenResponse({
      description: "Acceso denegado. Se requiere rol de administrador",
      content: {
        "application/json": {
          example: {
            statusCode: 403,
            message: "Forbidden resource",
            error: "Forbidden",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "No autorizado. Token inválido o no proporcionado",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Unauthorized",
            error: "Unauthorized",
          },
        },
      },
    })
  );

export const GetProviderByTripIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener todos los proveedores de un viaje",
      description:
        "Recupera todos los proveedores asociados a un viaje específico.",
    }),
    ApiParam({
      name: "tripId",
      description:
        "ID único del viaje para el que se quieren recuperar los proveedores",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiOkResponse({
      description: "Todos los proveedores listados correctamente",
      schema: {
        example: {
          id: "1777f4b6-e9c8-4c57-bb94-d7e2fd909583",
          name: "Proveedor 1",
          main_picture:
            "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
          wechat_contact: "wechat123",
          phone_number: "545454",
          address: "Calle 71 sur",
          city: "Medellin",
          gps_location: "6.2442,-75.5812",
          master_genre: "fgdfhgfhfdg",
          observation: "Proveedor confiable y puntual",
          created_at: "2025-07-22T07:05:42.222Z",
          updated_at: "2025-07-22T07:05:42.222Z",
          is_active: true,
        },
      },
      isArray: true,
    }),
    ApiNotFoundResponse({
      description: "Viaje no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Trip not found",
            error: "Not Found",
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
            message: "Internal server error",
            error: "Internal Server Error",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "No autorizado. Token inválido o no proporcionado",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Unauthorized",
            error: "Unauthorized",
          },
        },
      },
    })
  );

export const GetProductByTripIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener todos los productos de un viaje",
      description:
        "Recupera todos los productos asociados a un viaje específico.",
    }),
    ApiParam({
      name: "tripId",
      description:
        "ID único del viaje para el que se quieren recuperar los productos",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiOkResponse({
      description: "Todos los productos listados correctamente",
      schema: {
        example: {
          id: 1,
          categoryMaster: "electrodomesticos",
          reference: "REF12345",
          name: "Televisor 4K",
          price: "1000",
          cuantity: 10,
          color: "Rojo",
          height: 1,
          width: 5,
          depth: 3,
          manufacturing_date: "2023-10-01T05:00:00.000Z",
          quantity_per_box: 10,
          total_quantity_per_box: 100,
          total_quantity: 1000,
          own_packaging: true,
          state: "pending",
          desactivated: false,
          created_at: "2025-07-22T07:24:56.575Z",
          updated_at: "2025-07-22T07:24:56.575Z",
          tripId: "4483a0c9-817c-40cb-a12d-762744afd581",
        },
      },
      isArray: true,
    }),
    ApiNotFoundResponse({
      description: "Viaje no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Trip not found",
            error: "Not Found",
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
            message: "Internal server error",
            error: "Internal Server Error",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "No autorizado. Token inválido o no proporcionado",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Unauthorized",
            error: "Unauthorized",
          },
        },
      },
    })
  );

export const CreateProductByTripIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Crear un nuevo producto asociado a un viaje",
      description:
        "Crea un nuevo producto y lo asocia al viaje especificado, incluyendo imágenes si se proporcionan",
    }),
    ApiParam({
      name: "tripId",
      description: "ID del viaje al que se asociará el producto",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiBody({
      type: CreateProductDto,
      description: "Datos del producto a crear",
    }),
    ApiCreatedResponse({
      description: "Producto creado correctamente",
      schema: {
        example: {
          id: "0a3a3e8f-0823-4fec-b475-a8a3f4d47180",
          name: "Viaje #1",
          date: "2025-07-05",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
          createdAt: "2025-07-22T21:22:34.012Z",
          updatedAt: "2025-07-22T21:22:34.012Z",
          products: [
            {
              id: 1,
              categoryMaster: "electrodomesticos",
              reference: "REF12345",
              name: "Televisor 4K",
              price: "1000",
              cuantity: 10,
              color: "Rojo",
              height: 1,
              width: 5,
              depth: 3,
              manufacturing_date: "2023-10-01T05:00:00.000Z",
              quantity_per_box: 10,
              total_quantity_per_box: 100,
              total_quantity: 1000,
              own_packaging: true,
              state: "pending",
              desactivated: false,
              created_at: "2025-07-22T21:22:49.799Z",
              updated_at: "2025-07-22T21:22:49.799Z",
              tripId: "0a3a3e8f-0823-4fec-b475-a8a3f4d47180",
            },
          ],
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Viaje no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Trip not found",
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
              "name should not be empty",
              "price must be a positive number",
            ],
            error: "Bad Request",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "No autorizado. Token inválido o no proporcionado",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Unauthorized",
            error: "Unauthorized",
          },
        },
      },
    })
  );

export const CreateProviderByTripIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Crear un nuevo proveedor asociado a un viaje",
      description:
        "Crea un nuevo proveedor y lo asocia al viaje especificado, incluyendo imágenes si se proporcionan",
    }),
    ApiParam({
      name: "tripId",
      description: "ID del viaje al que se asociará el proveedor",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiBody({
      type: CreateProviderDTO,
      description: "Datos del proveedor a crear",
    }),
    ApiCreatedResponse({
      description: "Proveedor creado correctamente",
      schema: {
        example: {
          id: "367b762a-500b-4c9d-ba72-d878bba06f4d",
          name: "Viaje #1",
          date: "2025-07-05",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
          createdAt: "2025-07-22T21:36:40.460Z",
          updatedAt: "2025-07-22T21:36:40.460Z",
          providers: [
            {
              id: "7fc4db0c-ab7c-4765-a5f7-f747531c0c4c",
              name: "Proveedor 1",
              main_picture:
                "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
              wechat_contact: "wechat123",
              phone_number: "545454",
              address: "Calle 71 sur",
              city: "Medellin",
              gps_location: "6.2442,-75.5812",
              master_genre: "fgdfhgfhfdg",
              observation: "Proveedor confiable y puntual",
              created_at: "2025-07-22T21:36:53.016Z",
              updated_at: "2025-07-22T21:36:53.016Z",
              is_active: true,
              pictures: [
                {
                  id: "2e23e097-5d98-48dc-9f74-1d5a40fdae0d",
                  url_foto: "https://miimagen.com/extra4.jpg",
                  order: 1,
                  created_at: "2025-07-22T21:36:53.038Z",
                },
              ],
            },
          ],
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Viaje no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Trip not found",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Validación fallida",
      content: {
        "application/json": {
          examples: {
            nameExists: {
              summary: "Nombre de proveedor ya existe",
              value: {
                statusCode: 400,
                message: "Already registered provider name",
                error: "Bad Request",
              },
            },
            invalidData: {
              summary: "Datos inválidos",
              value: {
                statusCode: 400,
                message: [
                  "name should not be empty",
                  "email must be an email",
                  "phone_number must be a number",
                ],
                error: "Bad Request",
              },
            },
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
    })
  );

export const CreateTripByUserIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Crear un nuevo viaje para un usuario",
      description: "Crea un nuevo viaje asociado al usuario especificado",
    }),
    ApiParam({
      name: "userId",
      description: "ID del usuario que crea el viaje",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiBody({
      type: CreateTripDTO,
      description: "Datos del viaje a crear",
    }),
    ApiCreatedResponse({
      description: "Viaje creado correctamente",
      schema: {
        example: {
          name: "Viaje #1",
          date: "2025-07-06T00:00:00.000Z",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
          user: {
            id: "fc666982-aa79-4c36-96e1-6eb9d873182e",
            username: "usuario123",
            email: "usuario@mail.com",
            password:
              "$2b$10$NorBGbkd9UoOz26hEKq1neXsfwCvMYHA/BLX77gfMjrZ4kLN229..",
            admin: false,
            isActive: true,
            created_at: "2025-07-22T21:53:44.347Z",
            updated_at: "2025-07-22T21:53:44.347Z",
          },
          id: "365eee00-531b-4dd1-b5d5-17fc5ed91efd",
          createdAt: "2025-07-22T21:54:16.277Z",
          updatedAt: "2025-07-22T21:54:16.277Z",
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Usuario no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "User not found",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Validación fallida",
      content: {
        "application/json": {
          examples: {
            nameExists: {
              summary: "Nombre de viaje ya existe",
              value: {
                statusCode: 400,
                message: "Already registered trip name",
                error: "Bad Request",
              },
            },
            invalidData: {
              summary: "Datos inválidos",
              value: {
                statusCode: 400,
                message: [
                  "name should not be empty",
                  "date must be a valid date",
                  "budget must be a positive number",
                ],
                error: "Bad Request",
              },
            },
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
    })
  );

export const UpdateTripByTripIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Actualizar un viaje existente",
      description:
        "Modifica los datos de un viaje existente identificado por su ID",
    }),
    ApiParam({
      name: "tripId",
      description: "ID del viaje a actualizar",
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiBody({
      type: CreateTripDTO,
      description: "Datos actualizados del viaje",
    }),
    ApiOkResponse({
      description: "Viaje modificado correctamente",
      schema: {
        example: {
          name: "Viaje #1",
          date: "2025-07-06",
          travelers: ["Pepito Torres", "Juan Perez"],
          observation: "Este viaje es para cotizar productos de China",
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Viaje no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Trip not found",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Validación fallida",
      content: {
        "application/json": {
          examples: {
            invalidData: {
              summary: "Datos inválidos",
              value: {
                statusCode: 400,
                message: [
                  "name should not be empty",
                  "date must be a valid date",
                  "budget must be a positive number",
                ],
                error: "Bad Request",
              },
            },
            nameConflict: {
              summary: "Nombre de viaje ya existe",
              value: {
                statusCode: 400,
                message: "Trip name already exists for this user",
                error: "Bad Request",
              },
            },
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
    })
  );
