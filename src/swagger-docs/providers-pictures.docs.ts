import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiResponse,
} from "@nestjs/swagger";
import { ProviderPictureDTO } from "@/modules/providers/dtos/create-provider-picture.dto";
import { ReorderProviderPicturesDTO } from "@/modules/providers/dtos/reorder-provider-pictures.dto";

export const CreateProviderPictureDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Crea una nueva imagen para un proveedor",
      description: "Crea una nueva imagen asociada a un proveedor específico.",
    }),
    ApiParam({
      name: "providerId",
      description: "ID único del proveedor (UUID)",
      type: "string",
      format: "uuid",
      example: "ee5c8c64-218c-4a3d-88d9-71f734ad3c35",
    }),
    ApiBody({
      type: ProviderPictureDTO,
      description: "Datos de la imagen a crear",
    }),
    ApiCreatedResponse({
      description: "La imagen ha sido creada exitosamente.",
      schema: {
        example: {
          url_foto: "https://miimagen.com/foto1.jpg",
          order: 2,
          provider: {
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
          id: "59258c75-bda2-42c9-a2fa-a948f6b50cea",
          created_at: "2025-07-26T05:31:08.827Z",
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Datos inválidos o providerId inválido",
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
    ApiInternalServerErrorResponse({
      description: "Error interno del servidor",
      content: {
        "application/json": {
          example: {
            statusCode: 500,
            message: "Error al crear la imagen",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

// Obtener todas las imágenes de un proveedor
export const GetProviderPicturesByProviderIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtiene todas las imágenes de un proveedor",
      description:
        "Devuelve todas las imágenes asociadas a un proveedor específico.",
    }),
    ApiParam({
      name: "providerId",
      description: "ID único del proveedor (UUID)",
      type: "string",
      format: "uuid",
      example: "ee5c8c64-218c-4a3d-88d9-71f734ad3c35",
    }),
    ApiOkResponse({
      description: "Lista de imágenes del proveedor.",
      isArray: true,
      schema: {
        example: [
          {
            id: "3897d85e-7783-4203-858b-fcc89293ef29",
            url_foto: "https://miimagen.com/extra4.jpg",
            order: 1,
            created_at: "2025-07-26T04:50:28.116Z",
          },
          {
            id: "59258c75-bda2-42c9-a2fa-a948f6b50cea",
            url_foto: "https://miimagen.com/foto1.jpg",
            order: 2,
            created_at: "2025-07-26T05:31:08.827Z",
          },
        ],
      },
    }),
    ApiNotFoundResponse({
      description: "Proveedor no encontrado o sin imágenes",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Provider not found or no pictures",
            error: "Not Found",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "providerId inválido",
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
            message: "Error al obtener las imágenes",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

// Eliminar imagen de proveedor
export const DeleteProviderPictureDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Elimina una imagen de un proveedor",
      description: "Elimina una imagen específica de un proveedor por su ID.",
    }),
    ApiParam({
      name: "id",
      description: "ID único de la imagen a eliminar (UUID)",
      type: "string",
      format: "uuid",
      example: "be0859ef-cc00-47d4-b7b2-338bff6fbea6",
    }),
    ApiResponse({
      status: 200,
      description: "La imagen ha sido eliminada exitosamente.",
      schema: {
        example: { message: "Picture deleted" },
      },
    }),
    ApiNotFoundResponse({
      description: "Imagen no encontrada",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Picture not found",
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
            message: "Error al eliminar la imagen",
            error: "Internal Server Error",
          },
        },
      },
    })
  );

// Reordenar imágenes de proveedor
export const ReorderProviderPicturesDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Reordena las imágenes de un proveedor",
      description:
        "Actualiza el orden de todas las imágenes de un proveedor. <br> <br> <img src='https://i.ibb.co/Qq29jk8/image.png' alt='Ejemplo' width='300'/>",
    }),
    ApiParam({
      name: "providerId",
      description: "ID único del proveedor (UUID)",
      type: "string",
      format: "uuid",
      example: "ee5c8c64-218c-4a3d-88d9-71f734ad3c35",
    }),
    ApiBody({
      type: ReorderProviderPicturesDTO,
      description:
        "Arreglo de todas las imágenes existentes con sus nuevos órdenes. No puede faltar ninguna.",
    }),
    ApiOkResponse({
      description: "Orden de imágenes actualizado correctamente.",
      schema: {
        example: { message: "Orden de imágenes actualizado correctamente" },
      },
    }),
    ApiBadRequestResponse({
      description: "Órdenes duplicados o providerId inválido",
      content: {
        "application/json": {
          examples: {
            duplicated: {
              summary: "Órdenes duplicados",
              value: {
                statusCode: 400,
                message:
                  "No puede haber órdenes duplicados en las imágenes enviadas.",
                error: "Bad Request",
              },
            },
            invalidId: {
              summary: "ID inválido",
              value: {
                statusCode: 400,
                message: "Validation failed (uuid is expected)",
                error: "Bad Request",
              },
            },
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: "Proveedor o imágenes no encontrados",
      content: {
        "application/json": {
          example: {
            statusCode: 404,
            message: "Provider or pictures not found",
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
            message: "Error al reordenar las imágenes",
            error: "Internal Server Error",
          },
        },
      },
    })
  );
