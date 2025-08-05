// src/modules/auth/auth.service.ts
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
import { SubscriptionsService } from "../subscriptions/subscriptions.service";
import { TripsService } from "../trips/trips.service";
import { NotificationsGateway } from "../notifications/notifications.gateway";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly tripsService: TripsService,
    private readonly notificationsGateway: NotificationsGateway,
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

    // Crear suscripción de bienvenida automática
    console.log("🔄 Intentando crear suscripción de bienvenida para usuario:", user.id);
    try {
      const subscription = await this.subscriptionsService.createWelcomeSubscription(user.id, user.email);
      console.log("✅ Suscripción de bienvenida creada exitosamente:", subscription.id);
    } catch (error) {
      console.error("❌ Error creando suscripción de bienvenida:", error);
      // No lanzamos error para no interrumpir el registro
    }

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

      try {
    const viajeProximo = await this.tripsService.getViajeProximo(user.id);
    // if (viajeProximo) {
    //   const mensaje = `¡Tienes un viaje próximo el ${viajeProximo.date}! ✈️`;
    //   this.notificationsGateway.notifyUser(user.id, mensaje);
    // }
  } catch (error) {
    console.error("Error buscando viaje próximo:", error);
  }

    // Devolver todos los datos del usuario (sin la contraseña) junto con el token
    const { password, ...userWithoutPassword } = user;
    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  /**
   * Maneja el login de usuarios de Auth0 (Google, etc.)
   * 
   * Este método se llama cuando un usuario se autentica por primera vez
   * a través de Auth0. Verifica si el usuario existe y crea una suscripción
   * de bienvenida si es la primera vez que se conecta.
   * 
   * @param auth0User - Datos del usuario de Auth0
   * @returns Token JWT y datos del usuario
   */
  async handleAuth0Login(auth0User: any) {
    try {
      // Buscar usuario por email (Auth0 siempre proporciona email)
      let user = await this.usersService.findByEmail(auth0User.email);
      
      if (!user) {
        // Usuario nuevo de Auth0 - crearlo
        console.log("🆕 Creando nuevo usuario de Auth0:", auth0User.email);
        
        user = await this.usersService.create({
          username: auth0User.email.split('@')[0], // Usar parte del email como username
          email: auth0User.email,
          password: '', // Auth0 maneja la autenticación
          admin: false,
        });

        // Crear suscripción de bienvenida para usuario nuevo de Auth0
        console.log("🔄 Creando suscripción de bienvenida para usuario Auth0:", user.id);
        try {
          const subscription = await this.subscriptionsService.createWelcomeSubscription(user.id, user.email);
          console.log("✅ Suscripción de bienvenida creada para Auth0:", subscription.id);
        } catch (error) {
          console.error("❌ Error creando suscripción de bienvenida para Auth0:", error);
        }

        // Enviar email de bienvenida
        try {
          await this.emailService.sendWelcomeEmail({
            username: user.username,
            email: user.email,
          });
        } catch (error) {
          console.error("Error enviando email de bienvenida para Auth0:", error);
        }
      } else {
        console.log("👤 Usuario Auth0 existente:", user.email);
      }

      // Generar token JWT
      const payload = {
        sub: user.id,
        username: user.username,
        isAdmin: user.admin,
      };
      const token = this.jwtService.sign(payload, { expiresIn: "300h" });

      // Devolver datos del usuario y token
      const { password, ...userWithoutPassword } = user;
      return {
        access_token: token,
        user: userWithoutPassword,
      };

    } catch (error) {
      console.error("Error en handleAuth0Login:", error);
      throw new UnauthorizedException("Error procesando login de Auth0");
    }
  }
}
