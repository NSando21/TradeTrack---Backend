import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "src/roles.enum";

@Injectable()
export class MultiAuthGuard extends AuthGuard(["jwt", "auth0"]) {
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
      if (user.isAdmin) {
        user.roles = [Role.Admin];
      } else {
        user.roles = [Role.User];
      }

      return user;
    }
    // Si ninguna autenticó, lanza error
    throw err || new UnauthorizedException("No autorizado");
  }
}
