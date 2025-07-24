import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { MercadoPagoConfig, PreApprovalPlan, PreApproval } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
const preapprovalPlan = new PreApprovalPlan(client);
const preapproval = new PreApproval(client);

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  async createPlan(dto: CreatePlanDto) {
    try {
      const plan = await preapprovalPlan.create({
        body: {
          reason: dto.reason,
          auto_recurring: {
            frequency: dto.frequency,
            frequency_type: dto.frequency_type,
            transaction_amount: dto.transaction_amount,
            currency_id: dto.currency_id,
          },
          back_url: 'https://tu-sitio.com/back',
        }
      });
      return plan;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message || 'Error creando el plan');
    }
  }

  async createSubscription(dto: CreateSubscriptionDto) {
    try {
      const subscription = await preapproval.create({
        body: {
          preapproval_plan_id: dto.preapproval_plan_id,
          reason: 'Suscripción recurrente',
          payer_email: dto.payer_email,
          card_token_id: dto.card_token_id,
          status: 'authorized',
          back_url: 'https://tu-sitio.com/gracias'
        }
      });
      return subscription;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message || 'Error en la suscripción');
    }
  }
}
