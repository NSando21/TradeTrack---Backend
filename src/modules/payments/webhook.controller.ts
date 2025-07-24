import { Controller, Post, Req, Logger } from '@nestjs/common';

@Controller('payments/webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  @Post()
  handleWebhook(@Req() req) {
    this.logger.log('Webhook recibido:', req.body);
    // Procesa eventos según req.body.topic y req.body.data
    return { received: true };
  }
}
