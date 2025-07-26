import { UpdateProviderDTO } from "@/modules/providers/dtos/update-provider.dto";
import { Provider } from "@/modules/providers/Entities/provider.entity";
import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiResponse,
} from "@nestjs/swagger";

export const GetProvidersDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener todos los proveedores activos",
      description:
        "Devuelve utodos los proveedores activos con sus imágenes asociadas, ordenados por fecha de creación descendente",
    }),
    ApiOkResponse({
      description: "Lista de proveedores activos obtenida correctamente",
      isArray: true,
      schema: {
        example: {
          id: "ee5c8c64-218c-4a3d-88d9-71f734ad3c35",
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
          created_at: "2025-07-25T23:47:51.560Z",
          updated_at: "2025-07-25T23:47:51.560Z",
          is_active: true,
          userId: "ae017237-cfd7-4b28-9b05-79183bf74a15",
          pictures: [
            {
              id: "be0859ef-cc00-47d4-b7b2-338bff6fbea6",
              url_foto: "https://miimagen.com/extra4.jpg",
              order: 1,
              created_at: "2025-07-25T23:47:51.574Z",
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
            message: "Error al obtener los proveedores",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const GetProvidersByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener un proveedor por ID",
      description:
        "Devuelve los detalles completos de un proveedor activo específico, incluyendo sus imágenes asociadas",
    }),
    ApiParam({
      name: "id",
      description: "ID único del proveedor (UUID)",
      type: "string",
      format: "uuid",
      example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    ApiOkResponse({
      description: "Detalles del proveedor encontrado",
      schema: {
        example: {
          id: "4d02c142-a22c-4b74-bd72-b977c9bcf9e9",
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
          created_at: "2025-07-25T23:57:49.531Z",
          updated_at: "2025-07-25T23:57:49.531Z",
          is_active: true,
          userId: "163d227a-6076-447e-995a-8e973cb3316d",
          pictures: [
            {
              id: "9a708fc1-991f-480e-b9f3-40f30395c020",
              url_foto: "https://miimagen.com/extra4.jpg",
              order: 1,
              created_at: "2025-07-25T23:57:49.546Z",
            },
          ],
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Proveedor no encontrado o inactivo",
      content: {
        "application/json": {
          examples: {
            notFound: {
              summary: "Proveedor no existe",
              value: {
                statusCode: 404,
                message: "Provider not found",
                error: "Not Found",
              },
            },
            inactive: {
              summary: "Proveedor inactivo",
              value: {
                statusCode: 404,
                message: "Provider is not active",
                error: "Not Found",
              },
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "ID inválido",
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
            message: "Error al obtener el proveedor",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const UpdateProvidersByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Actualizar un proveedor existente",
      description:
        "Actualiza parcialmente los datos de un proveedor existente. Permite actualizar información básica y opcionalmente sus imágenes.",
    }),
    ApiParam({
      name: "id",
      description: "ID único del proveedor a actualizar (UUID v4)",
      type: "string",
      format: "uuid",
      example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    ApiBody({
      type: UpdateProviderDTO,
      description: "Datos del proveedor a actualizar",
    }),
    ApiOkResponse({
      description: "Proveedor actualizado exitosamente",
      schema: {
        example: {
          id: "026ed873-f409-411c-a08f-d767470e4f67",
          name: "Proveedor fdfdfd",
          main_picture:
            "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
          wechat_contact: "wechat123",
          phone_number: "545454",
          address: "Calle 71 sur",
          city: "Medellin",
          gps_location: "6.2442,-75.5812",
          master_genre: "fgdfhgfhfdg",
          observation: "Proveedor confiable y puntual",
          created_at: "2025-07-26T04:50:28.103Z",
          updated_at: "2025-07-26T04:52:00.292Z",
          is_active: true,
          userId: "a6996685-769b-4d58-a65b-961285be1f37",
          pictures: [
            {
              id: "3897d85e-7783-4203-858b-fcc89293ef29",
              url_foto: "https://miimagen.com/extra4.jpg",
              order: 1,
              created_at: "2025-07-26T04:50:28.116Z",
            },
          ],
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Proveedor no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Provider not found",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Datos de entrada inválidos",
      content: {
        "application/json": {
          examples: {
            invalidEmail: {
              summary: "Email inválido",
              value: {
                statusCode: 400,
                message: "contact_email must be an email",
                error: "Bad Request",
              },
            },
            invalidPhone: {
              summary: "Teléfono inválido",
              value: {
                statusCode: 400,
                message: "phone_number must be a valid phone number",
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
    }),
    ApiForbiddenResponse({
      description: "No tiene permisos para actualizar este proveedor",
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

export const DeleteProviderByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Elimina un proveedor",
      description:
        "Elimina un proveedor específico por su ID. (Lógicamente no lo elimina, sino que lo desactiva)",
    }),
    ApiParam({
      name: "id",
      description: "ID único del proveedor a eliminar (UUID v4)",
      type: "string",
      format: "uuid",
      example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    ApiResponse({
      status: 204,
      description: "Proveedor eliminado exitosamente (desactivado lógicamente)",
    }),
    ApiNotFoundResponse({
      description: "Proveedor no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Provider not found",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "ID inválido",
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
      description: "No tiene permisos para eliminar este proveedor",
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
    ApiInternalServerErrorResponse({
      description: "Error interno del servidor",
      content: {
        "application/json": {
          example: {
            statusCode: 500,
            message: "Error al eliminar el proveedor",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const ReactivateProviderByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Reactiva un proveedor eliminado lógicamente",
      description:
        "Reactiva un proveedor que ha sido eliminado lógicamente por su ID.",
    }),
    ApiParam({
      name: "id",
      description: "ID único del proveedor a reactivar (UUID v4)",
      type: "string",
      format: "uuid",
      example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    ApiResponse({
      status: 200,
      description: "El proveedor ha sido reactivado exitosamente.",
      schema: {
        example: {
          id: "026ed873-f409-411c-a08f-d767470e4f67",
          name: "Proveedor fdfdfd",
          main_picture:
            "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
          wechat_contact: "wechat123",
          phone_number: "545454",
          address: "Calle 71 sur",
          city: "Medellin",
          gps_location: "6.2442,-75.5812",
          master_genre: "fgdfhgfhfdg",
          observation: "Proveedor confiable y puntual",
          created_at: "2025-07-26T04:50:28.103Z",
          updated_at: "2025-07-26T05:07:37.806Z",
          is_active: true,
          userId: "a6996685-769b-4d58-a65b-961285be1f37",
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Proveedor no encontrado",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Provider not found",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "ID inválido",
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
            message: "Error al reactivar el proveedor",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

export const GetProvidersByUserDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtiene todos los proveedores registrados por un usuario",
      description:
        "Devuelve todos los proveedores que el usuario ha registrado, incluyendo sus imágenes asociadas.",
    }),
    ApiParam({
      name: "id",
      description: "ID único del usuario (UUID)",
      type: "string",
      format: "uuid",
      example: "ae017237-cfd7-4b28-9b05-79183bf74a15",
    }),
    ApiOkResponse({
      description: "Lista de proveedores registrados por el usuario",
      isArray: true,
      schema: {
        example: [
          {
            id: "026ed873-f409-411c-a08f-d767470e4f67",
            name: "Proveedor fdfdfd",
            main_picture:
              "https://www.zotal.com/wp-content/uploads/2019/08/razascaballos.png",
            wechat_contact: "wechat123",
            phone_number: "545454",
            address: "Calle 71 sur",
            city: "Medellin",
            gps_location: "6.2442,-75.5812",
            master_genre: "fgdfhgfhfdg",
            observation: "Proveedor confiable y puntual",
            created_at: "2025-07-26T04:50:28.103Z",
            updated_at: "2025-07-26T05:07:37.806Z",
            is_active: true,
            userId: "a6996685-769b-4d58-a65b-961285be1f37",
          },
        ],
      },
    }),
    ApiNotFoundResponse({
      description: "Usuario no encontrado o sin proveedores registrados",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "User not found or no providers registered",
            error: "Not Found",
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
            message: "Error al obtener los proveedores del usuario",
            error: "Internal Server Error",
          },
        },
      },
    })
  );
