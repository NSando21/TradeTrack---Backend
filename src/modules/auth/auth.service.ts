import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcryptjs";
import { EmailService } from "./email.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}

  async register(registerDto: RegisterUserDto) {
    const existing = await this.usersService.findByUsername(
      registerDto.username
    );
    if (existing) {
      throw new ConflictException("El nombre de usuario ya existe");
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Enviar email de bienvenida
    try {
      await this.emailService.sendWelcomeEmail({
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error enviando email de bienvenida:", error);
      // No lanzamos error para no interrumpir el registro
    }

    return {
      message: "Usuario registrado correctamente",
      user: { ...user, password: undefined },
    };
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException("Credenciales inválidas");
    }
    const payload = {
      sub: user.id,
      username: user.username,
      isAdmin: user.admin,
    };
    const token = this.jwtService.sign(payload, { expiresIn: "300h" });

    // Enviar email de bienvenida en cada login exitoso
    try {
      await this.emailService.sendWelcomeEmail({
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error enviando email de bienvenida en login:", error);
      // No lanzamos error para no interrumpir el login
    }

    // Devolver todos los datos del usuario (sin la contraseña) junto con el token
    const { password, ...userWithoutPassword } = user;
    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }
}
