import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiResponse,
} from "@nestjs/swagger";
import { User } from "@/modules/users/user.entity";

// Obtener todos los usuarios
export const GetAllUsersDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener todos los usuarios",
      description: "Devuelve una lista de todos los usuarios registrados.",
    }),
    ApiOkResponse({
      description: "Lista de usuarios obtenida correctamente",
      isArray: true,
      schema: {
        example: [
          {
            id: "a6996685-769b-4d58-a65b-961285be1f37",
            username: "usuario123",
            email: "usuario@mail.com",
            password:
              "$2b$10$d4eWxxyUECdYfLJqv6Gg4uhOAZsWS0J7eqw0NQCpZLErL8I4jGp9S",
            admin: false,
            isActive: true,
            created_at: "2025-07-26T04:49:05.247Z",
            updated_at: "2025-07-26T04:49:05.247Z",
          },
        ],
      },
    }),
    ApiResponse({
      status: 500,
      description: "Error interno del servidor",
    })
  );

// Obtener un usuario por ID
export const GetUserByIdDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener usuario por ID",
      description:
        "Devuelve la información de un usuario específico por su ID.",
    }),
    ApiParam({
      name: "id",
      description: "ID único del usuario",
      type: "string",
      example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    }),
    ApiOkResponse({
      description: "Usuario encontrado",
      schema: {
        example: {
          id: "a6996685-769b-4d58-a65b-961285be1f37",
          username: "usuario123",
          email: "usuario@mail.com",
          password:
            "$2b$10$d4eWxxyUECdYfLJqv6Gg4uhOAZsWS0J7eqw0NQCpZLErL8I4jGp9S",
          admin: false,
          isActive: true,
          created_at: "2025-07-26T04:49:05.247Z",
          updated_at: "2025-07-26T04:49:05.247Z",
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
    ApiResponse({
      status: 500,
      description: "Error interno del servidor",
    })
  );

// Crear un usuario
export const CreateUserDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Crear un nuevo usuario",
      description: "Crea un nuevo usuario con los datos proporcionados.",
    }),
    ApiBody({
      type: User,
      description: "Datos del usuario a crear",
    }),
    ApiCreatedResponse({
      description: "Usuario creado exitosamente",
      type: User,
    }),
    ApiBadRequestResponse({
      description: "Datos inválidos",
      content: {
        "application/json": {
          example: {
            statusCode: 400,
            message: "Datos inválidos",
            error: "Bad Request",
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: "Error interno del servidor",
    })
  );

// Actualizar un usuario
export const UpdateUserDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Actualizar usuario",
      description: "Actualiza los datos de un usuario existente.",
    }),
    ApiParam({
      name: "id",
      description: "ID único del usuario",
      type: "string",
      example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    }),
    ApiBody({
      type: User,
      description: "Datos del usuario a actualizar",
    }),
    ApiOkResponse({
      description: "Usuario actualizado exitosamente",
      schema: {
        example: {
          id: "a6996685-769b-4d58-a65b-961285be1f37",
          username: "usuario123",
          email: "dfdfdfdf@mail.com",
          password:
            "$2b$10$d4eWxxyUECdYfLJqv6Gg4uhOAZsWS0J7eqw0NQCpZLErL8I4jGp9S",
          admin: false,
          isActive: true,
          created_at: "2025-07-26T04:49:05.247Z",
          updated_at: "2025-07-26T06:18:12.909Z",
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
      description: "Datos inválidos",
      content: {
        "application/json": {
          example: {
            statusCode: 400,
            message: "Datos inválidos",
            error: "Bad Request",
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: "Error interno del servidor",
    })
  );

// Eliminar un usuario
export const DeleteUserDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Eliminar usuario",
      description: "Elimina un usuario por su ID.",
    }),
    ApiParam({
      name: "id",
      description: "ID único del usuario",
      type: "string",
      example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    }),
    ApiOkResponse({
      description: "Usuario eliminado exitosamente",
      schema: {
        example: {
          message: "User deleted",
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
    ApiResponse({
      status: 500,
      description: "Error interno del servidor",
    })
  );
