import { Controller, Get, Param, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionResponseDto } from './dtos/subscription-response.dto';

/**
 * Controlador que maneja las operaciones relacionadas con suscripciones
 * Expone endpoints para consultar y gestionar suscripciones de usuarios
 */
@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  private readonly logger = new Logger(SubscriptionsController.name);

  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  /**
   * Endpoint para obtener la suscripción actual de un usuario
   * 
   * Este endpoint retorna la suscripción más reciente del usuario especificado:
   * - Si el usuario tiene suscripción activa: retorna datos completos con isActive = true
   * - Si el usuario tiene suscripción expirada: retorna datos con isActive = false
   * - Si el usuario no tiene suscripción: retorna subscription: null
   * 
   * @param userId - ID del usuario para consultar su suscripción
   * @returns Objeto con la suscripción o null si no existe
   */
  @ApiOperation({
    summary: 'Obtener suscripción actual de un usuario',
    description: 'Retorna la suscripción más reciente del usuario especificado'
  })
  @ApiParam({
    name: 'userId',
    description: 'ID único del usuario',
    example: 'e9ba9d84-a7dc-4b6e-8ee4-46685d8391f0'
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción obtenida exitosamente',
    schema: {
      example: {
        subscription: {
          id: "sub_123",
          userId: "user_456",
          planType: "monthly",
          status: "active",
          startDate: "2025-01-01T00:00:00.000Z",
          endDate: "2025-02-01T00:00:00.000Z",
          isActive: true,
          mpSubscriptionId: "mp_sub_789",
          created_at: "2025-01-01T00:00:00.000Z",
          updated_at: "2025-01-01T00:00:00.000Z"
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario sin suscripción',
    schema: {
      example: {
        subscription: null
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado'
  })
  @Get('user/:userId')
  async getUserSubscription(@Param('userId') userId: string) {
    this.logger.log(`Consultando suscripción para usuario: ${userId}`);
    return this.subscriptionsService.getUserSubscription(userId);
  }

  /**
   * Endpoint para cancelar la suscripción actual de un usuario
   * 
   * @param userId - ID del usuario cuya suscripción se va a cancelar
   * @returns La suscripción cancelada
   */
  @ApiOperation({
    summary: 'Cancelar suscripción de un usuario',
    description: 'Cancela la suscripción más reciente del usuario especificado'
  })
  @ApiParam({
    name: 'userId',
    description: 'ID único del usuario',
    example: 'e9ba9d84-a7dc-4b6e-8ee4-46685d8391f0'
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción cancelada exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o suscripción no encontrada'
  })
  @Post('user/:userId/cancel')
  async cancelSubscription(@Param('userId') userId: string) {
    this.logger.log(`Cancelando suscripción para usuario: ${userId}`);
    return this.subscriptionsService.cancelSubscription(userId);
  }

  /**
   * Endpoint para simular la expiración de una suscripción (SOLO PARA PRUEBAS)
   * 
   * @param userId - ID del usuario cuya suscripción se va a simular como expirada
   * @returns La suscripción con fecha de expiración modificada
   */
  @ApiOperation({
    summary: 'Simular expiración de suscripción (SOLO PRUEBAS)',
    description: 'Modifica la fecha de fin de la suscripción para simular que expiró'
  })
  @ApiParam({
    name: 'userId',
    description: 'ID único del usuario',
    example: 'e9ba9d84-a7dc-4b6e-8ee4-46685d8391f0'
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción simulada como expirada exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o suscripción no encontrada'
  })
  @Post('user/:userId/simulate-expiration')
  async simulateExpiration(@Param('userId') userId: string) {
    this.logger.log(`Simulando expiración para usuario: ${userId}`);
    return this.subscriptionsService.simulateExpiration(userId);
  }
} 