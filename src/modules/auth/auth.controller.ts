import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';

@ApiTags('auth')
@ApiExtraModels(User)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente.',
    schema: {
      example: {
        message: 'Usuario registrado correctamente',
        user: {
          id: 'uuid',
          name: 'Nombre Apellido',
          dni: 'dni',
          username: 'usuario123',
          email: 'usuario@mail.com',
          auth: 'pass',
          rol: 'empleado',
          approved: false,
          created_at: '2024-06-01T00:00:00.000Z',
          updated_at: '2024-06-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'El nombre de usuario ya existe',
    schema: { example: { statusCode: 409, message: 'El nombre de usuario ya existe', error: 'Conflict' } },
  })
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso, retorna JWT.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
    schema: { example: { statusCode: 401, message: 'Credenciales inválidas', error: 'Unauthorized' } },
  })
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('auth0'))
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado con Auth0' })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario autenticado.',
    schema: {
      example: {
        id: 'uuid',
        name: 'Nombre Apellido',
        dni: 'dni',
        username: 'usuario123',
        email: 'usuario@mail.com',
        auth: 'pass',
        rol: 'empleado',
        approved: false,
        created_at: '2024-06-01T00:00:00.000Z',
        updated_at: '2024-06-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    schema: { example: { statusCode: 401, message: 'Unauthorized', error: 'Unauthorized' } },
  })
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('test-auth0')
  @ApiOperation({ summary: 'Endpoint de prueba para verificar configuración de Auth0' })
  @ApiResponse({
    status: 200,
    description: 'Configuración de Auth0 verificada.',
    schema: {
      example: {
        message: 'Auth0 configurado correctamente',
        domain: 'your-domain.auth0.com',
        clientId: 'your-client-id',
        hasSecret: true
      },
    },
  })
  testAuth0() {
    return {
      message: 'Auth0 configurado correctamente',
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      hasSecret: !!process.env.AUTH0_CLIENT_SECRET
    };
  }

  @Get('auth0-status')
  @ApiOperation({ summary: 'Verificar estado de la estrategia Auth0' })
  @ApiResponse({
    status: 200,
    description: 'Estado de la estrategia Auth0.',
    schema: {
      example: {
        strategyLoaded: true,
        config: {
          jwtFromRequest: 'Bearer token',
          ignoreExpiration: false,
          hasSecret: true,
          hasAudience: true,
          hasIssuer: true
        }
      },
    },
  })
  getAuth0Status() {
    return {
      strategyLoaded: true,
      config: {
        jwtFromRequest: 'Bearer token',
        ignoreExpiration: false,
        hasSecret: !!process.env.AUTH0_CLIENT_SECRET,
        hasAudience: !!process.env.AUTH0_CLIENT_ID,
        hasIssuer: !!process.env.AUTH0_DOMAIN
      }
    };
  }
} 