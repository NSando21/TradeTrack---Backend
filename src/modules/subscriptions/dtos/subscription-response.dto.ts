import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la respuesta de suscripción de usuario
 * Define la estructura de datos que se retorna al consultar la suscripción de un usuario
 */
export class SubscriptionResponseDto {
  /**
   * ID único de la suscripción en nuestra base de datos
   */
  @ApiProperty({
    example: "sub_123",
    description: "ID único de la suscripción"
  })
  id: string;

  /**
   * ID único del usuario propietario de la suscripción
   */
  @ApiProperty({
    example: "user_456",
    description: "ID del usuario propietario"
  })
  userId: string;

  /**
   * Tipo de plan de suscripción
   * - welcome: Suscripción de bienvenida (1 mes gratis)
   * - monthly: Suscripción mensual (1 mes)
   * - quarterly: Suscripción trimestral (3 meses)
   * - lifetime: Suscripción de por vida
   */
  @ApiProperty({
    example: "monthly",
    description: "Tipo de plan de suscripción",
    enum: ['welcome', 'monthly', 'quarterly', 'lifetime']
  })
  planType: 'welcome' | 'monthly' | 'quarterly' | 'lifetime';

  /**
   * Estado actual de la suscripción
   * - active: Suscripción activa y vigente
   * - expired: Suscripción expirada
   * - cancelled: Suscripción cancelada
   */
  @ApiProperty({
    example: "active",
    description: "Estado de la suscripción",
    enum: ['active', 'expired', 'cancelled']
  })
  status: 'active' | 'expired' | 'cancelled';

  /**
   * Fecha de inicio de la suscripción
   */
  @ApiProperty({
    example: "2025-01-01T00:00:00.000Z",
    description: "Fecha de inicio de la suscripción"
  })
  startDate: string;

  /**
   * Fecha de finalización de la suscripción
   * Para suscripciones lifetime puede ser null
   */
  @ApiProperty({
    example: "2025-02-01T00:00:00.000Z",
    description: "Fecha de finalización de la suscripción",
    nullable: true
  })
  endDate: string | null;

  /**
   * Indica si la suscripción está activa y vigente
   * Se calcula basándose en el status y la fecha de expiración
   */
  @ApiProperty({
    example: true,
    description: "Indica si la suscripción está activa y vigente"
  })
  isActive: boolean;

  /**
   * ID de la suscripción en Mercado Pago
   * Puede ser null para suscripciones de bienvenida que no pasan por Mercado Pago
   */
  @ApiProperty({
    example: "mp_sub_789",
    description: "ID de la suscripción en Mercado Pago",
    nullable: true
  })
  mpSubscriptionId: string | null;

  /**
   * Fecha de creación del registro
   */
  @ApiProperty({
    example: "2025-01-01T00:00:00.000Z",
    description: "Fecha de creación del registro"
  })
  created_at: string;

  /**
   * Fecha de última actualización del registro
   */
  @ApiProperty({
    example: "2025-01-01T00:00:00.000Z",
    description: "Fecha de última actualización"
  })
  updated_at: string;
} 