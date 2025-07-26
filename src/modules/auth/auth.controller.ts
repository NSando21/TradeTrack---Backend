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
      },
    };
  }
}
