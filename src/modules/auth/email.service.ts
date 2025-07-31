import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(user: { username: string; email: string }) {
    const registrationDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: '¡Bienvenido a Backend-PI!',
        template: 'welcome',
        context: {
          username: user.username,
          email: user.email,
          registrationDate,
        },
      });
      this.logger.log(`Email de bienvenida enviado a ${user.email}`);
    } catch (error) {
      this.logger.warn(
        `No se pudo enviar el email de bienvenida a ${user.email}: ${error.message}`,
      );
      // No lanzar el error para no bloquear el flujo principal
    }
  }
}