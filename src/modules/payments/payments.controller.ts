import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

/**
 * Controlador que maneja las operaciones relacionadas con pagos y suscripciones
 * Expone endpoints para crear suscripciones personalizadas sin plan asociado
 * Utiliza el flujo de autorización de Mercado Pago
 */
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Endpoint para crear una suscripción personalizada para un usuario
   * 
   * Este endpoint implementa el flujo de suscripciones sin plan asociado:
   * 1. Recibe los datos de la suscripción (email, frecuencia, monto, usuario)
   * 2. Crea la suscripción en Mercado Pago usando el SDK
   * 3. Guarda la suscripción en nuestra base de datos local
   * 4. Retorna los datos de Mercado Pago y nuestra base de datos
   * 
   * El frontend debe usar el 'init_point' retornado para redirigir al usuario
   * al checkout de Mercado Pago para completar la autorización
   * 
   * @param dto - Datos de la suscripción a crear
   * @returns Objeto con datos de Mercado Pago y base de datos local
   */
  @ApiOperation({ 
    summary: 'Crear suscripción personalizada para usuario (sin plan asociado)',
    description: 'Crea una suscripción personalizada usando el flujo de autorización de Mercado Pago'
  })
  @Post('subscribe')
  createSubscription(@Body() dto: CreateSubscriptionDto) {
    return this.paymentsService.createSubscription(dto);
  }
}
