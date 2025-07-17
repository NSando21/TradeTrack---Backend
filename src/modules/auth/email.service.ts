import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(user: { username: string; email: string }) {
    const registrationDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: '¡Bienvenido a Backend-PI!',
      template: 'welcome',
      context: {
        username: user.username,
        email: user.email,
        registrationDate: registrationDate,
      },
    });
  }
} 