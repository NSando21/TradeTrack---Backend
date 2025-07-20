import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MultiAuthGuard extends AuthGuard(['jwt', 'auth0']) {
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    
    // Log para debugging
    console.log('🔍 [MULTI-AUTH] Validando request:', {
      hasToken: !!token,
      tokenLength: token?.length,
      userFound: !!user,
      error: err?.message,
      info: info?.message,
      errorStack: err?.stack?.split('\n')[0], // Solo la primera línea del stack
      infoType: info?.constructor?.name
    });

    // Si alguna estrategia autenticó, permite el acceso
    if (user) {
      console.log('✅ [MULTI-AUTH] Usuario autenticado:', user.sub || user.id);
      return user;
    }
    
    // Si ninguna autenticó, lanza error con información detallada
    const errorMessage = err?.message || info?.message || 'No autorizado';
    console.log('❌ [MULTI-AUTH] Error de autenticación:', errorMessage);
    
    // Log adicional para debugging
    if (err) {
      console.log('❌ [MULTI-AUTH] Error completo:', {
        name: err.name,
        message: err.message,
        stack: err.stack?.split('\n').slice(0, 3) // Primeras 3 líneas del stack
      });
    }
    
    if (info) {
      console.log('❌ [MULTI-AUTH] Info adicional:', {
        name: info.name,
        message: info.message,
        type: info.constructor?.name
      });
    }
    
    // Siempre lanzar un UnauthorizedException en lugar del error original
    throw new UnauthorizedException(errorMessage);
  }
} 