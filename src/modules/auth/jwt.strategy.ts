import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    console.log("JwtStrategy.validate() ejecutado. Payload:", payload);
    // Puedes personalizar qué datos del payload quieres devolver
    return {
      userId: payload.sub,
      username: payload.username,
      isAdmin: payload.isAdmin,
    };
  }
}
