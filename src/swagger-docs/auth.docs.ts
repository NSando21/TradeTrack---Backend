import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { RegisterUserDto } from "@/modules/auth/dto/register-user.dto";
import { LoginUserDto } from "@/modules/auth/dto/login-user.dto";

// Registro de usuario
export const RegisterDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Registrar un nuevo usuario",
      description: "Crea un nuevo usuario en el sistema.",
    }),
    ApiBody({ type: RegisterUserDto }),
    ApiCreatedResponse({
      description: "Usuario registrado exitosamente",
      schema: {
        example: {
          id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
          email: "usuario@correo.com",
          name: "Nombre Apellido",
          created_at: "2025-07-25T23:47:51.560Z",
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Datos inválidos o usuario ya existe",
      content: {
        "application/json": {
          example: {
            statusCode: 400,
            message: "El usuario ya existe",
            error: "Bad Request",
          },
        },
      },
    })
  );

// Login de usuario
export const LoginDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Iniciar sesión",
      description: "Autentica un usuario y devuelve un token JWT.",
    }),
    ApiBody({ type: LoginUserDto }),
    ApiOkResponse({
      description: "Inicio de sesión exitoso",
      schema: {
        example: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          user: {
            id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
            email: "usuario@correo.com",
            name: "Nombre Apellido",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "Credenciales inválidas",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Credenciales inválidas",
            error: "Unauthorized",
          },
        },
      },
    })
  );

// Obtener perfil del usuario autenticado
export const GetProfileDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Obtener perfil del usuario autenticado",
      description:
        "Devuelve la información del usuario autenticado mediante JWT.",
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "Perfil del usuario autenticado",
      schema: {
        example: {
          id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
          email: "usuario@correo.com",
          name: "Nombre Apellido",
          created_at: "2025-07-25T23:47:51.560Z",
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "Token inválido o no enviado",
      content: {
        "application/json": {
          example: {
            statusCode: 401,
            message: "Unauthorized",
          },
        },
      },
    })
  );

// Test Auth0
export const TestAuth0Doc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Test de configuración de Auth0",
      description: "Verifica que Auth0 esté configurado correctamente.",
    }),
    ApiOkResponse({
      description: "Respuesta de prueba de Auth0",
      schema: {
        example: {
          message: "Auth0 configurado correctamente",
          domain: "dev-xxxxxx.us.auth0.com",
          clientId: "abc123",
          hasSecret: true,
        },
      },
    })
  );

// Estado de Auth0
export const Auth0StatusDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: "Estado de la configuración de Auth0",
      description: "Devuelve el estado de la configuración de Auth0.",
    }),
    ApiOkResponse({
      description: "Estado de Auth0",
      schema: {
        example: {
          strategyLoaded: true,
          config: {
            jwtFromRequest: "Bearer token",
            ignoreExpiration: false,
            hasSecret: true,
            hasAudience: true,
            hasIssuer: true,
          },
        },
      },
    })
  );
