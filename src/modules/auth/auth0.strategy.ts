import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import * as jwksClient from 'jwks-rsa';

dotenv.config();

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  private jwksClient: any;
  constructor() {
    // Crear cliente JWKS para obtener las claves públicas
    const jwksClientInstance = jwksClient({
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000, // 10 minutos
    });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (req, token, done) => {
        console.log('🔍 [AUTH0] Iniciando validación de token...');
        
        // Obtener el kid del token
        const decoded = this.decodeToken(token);
        if (!decoded || !decoded.header || !decoded.header.kid) {
          console.log('❌ [AUTH0] No se pudo obtener el kid del token');
          return done(new Error('No se pudo obtener el kid del token'));
        }

        console.log('🔍 [AUTH0] Kid obtenido:', decoded.header.kid);

        // Obtener la clave pública usando el kid
        jwksClientInstance.getSigningKey(decoded.header.kid, (err, key) => {
          if (err) {
            console.log('❌ [AUTH0] Error obteniendo clave pública:', err.message);
            return done(err);
          }
          
          console.log('✅ [AUTH0] Clave pública obtenida correctamente');
          const signingKey = key.getPublicKey();
          console.log('🔍 [AUTH0] Clave pública (primeros 50 chars):', signingKey.substring(0, 50) + '...');
          done(null, signingKey);
        });
      },
      // Para ID tokens, la audiencia es el client ID
      audience: process.env.AUTH0_CLIENT_ID,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      passReqToCallback: true,
      algorithms: ['RS256'],
    });

    // Asignar después de super()
    this.jwksClient = jwksClientInstance;
  }

  private decodeToken(token: string) {
    try {
      console.log('🔍 [AUTH0] Decodificando token...');
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.log('❌ [AUTH0] Token no tiene formato JWT válido (partes:', parts.length, ')');
        return null;
      }
      
      const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      
      console.log('✅ [AUTH0] Token decodificado correctamente');
      console.log('🔍 [AUTH0] Header:', header);
      console.log('🔍 [AUTH0] Payload keys:', Object.keys(payload));
      
      return { header, payload };
    } catch (error) {
      console.log('❌ [AUTH0] Error decodificando token:', error.message);
      return null;
    }
  }

  async validate(req: Request, payload: any) {
    console.log('🔍 [AUTH0] Método validate llamado con payload:', payload ? 'SÍ' : 'NO');
    
    // Verificar que el payload existe
    if (!payload) {
      console.log('❌ [AUTH0] Payload vacío');
      throw new UnauthorizedException('Token inválido');
    }

    // Verificar que el payload tiene las propiedades necesarias
    if (!payload.sub) {
      console.log('❌ [AUTH0] Token sin sub:', payload);
      throw new UnauthorizedException('Token malformado');
    }

    // Log para debugging
    console.log('🔍 [AUTH0] Validando token:', {
      sub: payload.sub,
      aud: payload.aud,
      iss: payload.iss,
      exp: payload.exp,
      iat: payload.iat,
      tokenType: payload.azp || 'unknown'
    });

    // Verificar que el issuer es correcto
    const expectedIssuer = `https://${process.env.AUTH0_DOMAIN}/`;
    if (payload.iss !== expectedIssuer) {
      console.log('❌ [AUTH0] Issuer incorrecto:', {
        expected: expectedIssuer,
        received: payload.iss
      });
      throw new UnauthorizedException('Issuer inválido');
    }

    // Para ID tokens, la audiencia debe ser el client ID
    if (payload.aud !== process.env.AUTH0_CLIENT_ID) {
      console.log('❌ [AUTH0] Audience incorrecto:', {
        expected: process.env.AUTH0_CLIENT_ID,
        received: payload.aud
      });
      throw new UnauthorizedException('Audience inválido');
    }

    console.log('✅ [AUTH0] Token válido para usuario:', payload.sub);
    return payload;
  }
}
