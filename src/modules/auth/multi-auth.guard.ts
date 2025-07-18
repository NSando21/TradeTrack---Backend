import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MultiAuthGuard extends AuthGuard(['jwt', 'auth0']) {
  handleRequest(err, user, info, context) {
    // Si alguna estrategia autenticó, permite el acceso
    if (user) {
      return user;
    }
    // Si ninguna autenticó, lanza error
    throw err || new UnauthorizedException('No autorizado');
  }
} 