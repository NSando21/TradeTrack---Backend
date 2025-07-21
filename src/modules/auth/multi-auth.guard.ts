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
