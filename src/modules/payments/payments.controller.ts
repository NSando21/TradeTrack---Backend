import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Crear plan de suscripción Mercadopago' })
  @Post('plan')
  createPlan(@Body() dto: CreatePlanDto) {
    return this.paymentsService.createPlan(dto);
  }

  @ApiOperation({ summary: 'Crear suscripción recurrente para usuario' })
  @Post('subscribe')
  createSubscription(@Body() dto: CreateSubscriptionDto) {
    return this.paymentsService.createSubscription(dto);
  }
}
