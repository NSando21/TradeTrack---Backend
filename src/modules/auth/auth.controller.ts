import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiExtraModels, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "../users/user.entity";
import { MultiAuthGuard } from "./multi-auth.guard";
import {
  RegisterDoc,
  LoginDoc,
  GetProfileDoc,
  TestAuth0Doc,
  Auth0StatusDoc,
} from "@/swagger-docs/auth.docs";

@ApiTags("auth")
@ApiExtraModels(User)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @RegisterDoc()
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @LoginDoc()
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get("profile")
  @GetProfileDoc()
  @UseGuards(MultiAuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Get("test-auth0")
  @TestAuth0Doc()
  testAuth0() {
    return {
      message: "Auth0 configurado correctamente",
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      hasSecret: !!process.env.AUTH0_CLIENT_SECRET,
    };
  }

  @Get("auth0-status")
  @Auth0StatusDoc()
  getAuth0Status() {
    return {
      strategyLoaded: true,
      config: {
        jwtFromRequest: "Bearer token",
        ignoreExpiration: false,
        hasSecret: !!process.env.AUTH0_CLIENT_SECRET,
        hasAudience: !!process.env.AUTH0_CLIENT_ID,
        hasIssuer: !!process.env.AUTH0_DOMAIN,
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        secretLength: process.env.AUTH0_CLIENT_SECRET?.length || 0
      }
    };
  }

  @Post('debug-token')
  @ApiOperation({ summary: 'Debug de token de Auth0' })
  @ApiResponse({
    status: 200,
    description: 'Información del token decodificado.',
  })
  async debugToken(@Request() req, @Body() body?: { token?: string }) {
    // Intentar obtener el token del header Authorization primero
    let token = req.headers.authorization?.replace('Bearer ', '');
    
    // Si no está en el header, intentar obtenerlo del body
    if (!token && body?.token) {
      token = body.token;
    }
    
    if (!token) {
      return {
        error: 'No se proporcionó token',
        headers: req.headers,
        body: body
      };
    }

    try {
      // Verificar si el token tiene el formato JWT (3 partes separadas por puntos)
      const tokenParts = token.split('.');
      
      if (tokenParts.length !== 3) {
        return {
          error: 'Token no tiene formato JWT válido',
          tokenParts: tokenParts.length,
          tokenLength: token.length,
          tokenStart: token.substring(0, 50) + '...'
        };
      }

      // Decodificar el header
      let header;
      try {
        const headerBase64 = tokenParts[0];
        const headerJson = Buffer.from(headerBase64, 'base64').toString();
        header = JSON.parse(headerJson);
      } catch (headerError) {
        return {
          error: 'Error al decodificar header del token',
          headerError: headerError.message,
          tokenLength: token.length
        };
      }

      // Decodificar el payload
      let payload;
      try {
        const payloadBase64 = tokenParts[1];
        const payloadJson = Buffer.from(payloadBase64, 'base64').toString();
        payload = JSON.parse(payloadJson);
      } catch (payloadError) {
        return {
          error: 'Error al decodificar payload del token',
          payloadError: payloadError.message,
          header: header,
          tokenLength: token.length
        };
      }
      
      return {
        tokenInfo: {
          header: header,
          payload: payload,
          signature: tokenParts[2]?.substring(0, 20) + '...',
          algorithm: header.alg,
          type: header.typ
        },
        config: {
          domain: process.env.AUTH0_DOMAIN,
          clientId: process.env.AUTH0_CLIENT_ID,
          hasSecret: !!process.env.AUTH0_CLIENT_SECRET
        },
        analysis: {
          isJWT: true,
          hasExp: !!payload.exp,
          hasSub: !!payload.sub,
          hasAud: !!payload.aud,
          hasIss: !!payload.iss,
          expDate: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
          isExpired: payload.exp ? Date.now() > payload.exp * 1000 : null
        }
      };
    } catch (error) {
      return {
        error: 'Error general al procesar token',
        message: error.message,
        tokenLength: token.length,
        tokenStart: token.substring(0, 50) + '...'
      };
    }
  }

  @Get('test-auth0-only')
  @UseGuards(AuthGuard('auth0'))
  @ApiOperation({ summary: 'Probar solo estrategia Auth0' })
  @ApiResponse({
    status: 200,
    description: 'Auth0 funciona correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'Auth0 falló.',
  })
  testAuth0Only(@Request() req) {
    return {
      message: 'Auth0 funciona correctamente',
      user: req.user,
      tokenInfo: {
        sub: req.user?.sub,
        aud: req.user?.aud,
        iss: req.user?.iss
      }
    };
  }

  @Get('test-jwt-only')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Probar solo estrategia JWT' })
  @ApiResponse({
    status: 200,
    description: 'JWT funciona correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'JWT falló.',
  })
  testJwtOnly(@Request() req) {
    return {
      message: 'JWT funciona correctamente',
      user: req.user,
      tokenInfo: {
        id: req.user?.id,
        username: req.user?.username
      }
    };
  }

  @Post('test-auth0-manual')
  @ApiOperation({ summary: 'Probar validación manual de token Auth0' })
  @ApiResponse({
    status: 200,
    description: 'Token validado manualmente.',
  })
  async testAuth0Manual(@Body() body: { token: string }) {
    const { token } = body;
    
    if (!token) {
      return { error: 'No se proporcionó token' };
    }

    try {
      // Decodificar el token manualmente
      const tokenParts = token.split('.');
      
      if (tokenParts.length !== 3) {
        return { error: 'Token no tiene formato JWT válido' };
      }

      const header = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString());
      const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
      
      // Verificar issuer
      const expectedIssuer = `https://${process.env.AUTH0_DOMAIN}/`;
      const issuerValid = payload.iss === expectedIssuer;
      
      // Verificar audience
      const audienceValid = payload.aud === process.env.AUTH0_CLIENT_ID;
      
      // Verificar expiración
      const now = Math.floor(Date.now() / 1000);
      const notExpired = payload.exp > now;
      
      return {
        tokenInfo: {
          header,
          payload,
          algorithm: header.alg,
          kid: header.kid
        },
        validation: {
          issuerValid,
          expectedIssuer,
          receivedIssuer: payload.iss,
          audienceValid,
          expectedAudience: process.env.AUTH0_CLIENT_ID,
          receivedAudience: payload.aud,
          notExpired,
          exp: payload.exp,
          now,
          timeLeft: payload.exp - now
        },
        config: {
          domain: process.env.AUTH0_DOMAIN,
          clientId: process.env.AUTH0_CLIENT_ID,
          hasSecret: !!process.env.AUTH0_CLIENT_SECRET
        }
      };
    } catch (error) {
      return {
        error: 'Error al procesar token',
        message: error.message
      };
    }
  }

  @Post('validate-auth0-token')
  @ApiOperation({ summary: 'Validar token de Auth0 manualmente' })
  @ApiResponse({
    status: 200,
    description: 'Token validado correctamente.',
  })
  async validateAuth0Token(@Body() body: { token: string }) {
    const { token } = body;
    
    if (!token) {
      return { error: 'No se proporcionó token' };
    }

    try {
      // Decodificar el token
      const tokenParts = token.split('.');
      
      if (tokenParts.length !== 3) {
        return { error: 'Token no tiene formato JWT válido' };
      }

      const header = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString());
      const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
      
      // Verificar que es un token RS256
      if (header.alg !== 'RS256') {
        return { error: 'Algoritmo no soportado', algorithm: header.alg };
      }

      // Verificar issuer
      const expectedIssuer = `https://${process.env.AUTH0_DOMAIN}/`;
      if (payload.iss !== expectedIssuer) {
        return { 
          error: 'Issuer incorrecto',
          expected: expectedIssuer,
          received: payload.iss
        };
      }

      // Verificar audience (para ID tokens es el client ID)
      if (payload.aud !== process.env.AUTH0_CLIENT_ID) {
        return { 
          error: 'Audience incorrecto',
          expected: process.env.AUTH0_CLIENT_ID,
          received: payload.aud
        };
      }

      // Verificar expiración
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        return { 
          error: 'Token expirado',
          exp: payload.exp,
          now: now
        };
      }

      return {
        success: true,
        user: {
          sub: payload.sub,
          email: payload.email,
          name: payload.name,
          given_name: payload.given_name,
          family_name: payload.family_name
        },
        tokenInfo: {
          algorithm: header.alg,
          kid: header.kid,
          exp: payload.exp,
          iat: payload.iat
        }
      };
    } catch (error) {
      return {
        error: 'Error al procesar token',
        message: error.message
      };
    }
  }

  @Get('test-simple')
  @ApiOperation({ summary: 'Endpoint de prueba simple' })
  @ApiResponse({
    status: 200,
    description: 'Servidor funcionando correctamente.',
  })
  testSimple() {
    return {
      message: 'Servidor funcionando correctamente',
      timestamp: new Date().toISOString(),
      config: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        hasSecret: !!process.env.AUTH0_CLIENT_SECRET
      }
>>>>>>> main
    };
  }
}
