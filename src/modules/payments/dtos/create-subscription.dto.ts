import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsIn } from "class-validator";

/**
 * DTO (Data Transfer Object) para crear una nueva suscripción personalizada
 * Este DTO define la estructura de datos que debe enviar el frontend
 * para crear una suscripción sin plan asociado (flujo de autorización)
 */
export class CreateSubscriptionDto {
  /**
   * Email del usuario que realizará el pago
   * Debe ser un email válido y será usado por Mercado Pago para enviar notificaciones
   * Ejemplo: "usuario@ejemplo.com"
   */
  @ApiProperty({ 
    example: "usuario@ejemplo.com",
    description: "Email del pagador para la suscripción"
  })
  @IsEmail()
  payer_email: string;

  /**
   * Número de unidades de tiempo para la frecuencia de pago
   * Se combina con frequency_type para determinar el intervalo
   * Ejemplos: 1 (mensual), 3 (trimestral), 12 (anual)
   */
  @ApiProperty({ 
    example: 1,
    description: "Número de unidades para la frecuencia de pago"
  })
  @IsNumber()
  frequency: number;

  /**
   * Tipo de frecuencia para la suscripción
   * Valores permitidos: 'days', 'months', 'years'
   * Se combina con frequency para determinar el intervalo de pago
   */
  @ApiProperty({ 
    example: "months",
    description: "Tipo de frecuencia: 'days', 'months', 'years'"
  })
  @IsString()
  @IsNotEmpty()
  frequency_type: string;

  /**
   * Monto de la transacción en centavos (COP)
   * Mercado Pago espera el monto en centavos, no en pesos
   * Ejemplo: 150000 = $1,500.00 COP
   */
  @ApiProperty({ 
    example: 150000,
    description: "Monto de la transacción en centavos (COP)"
  })
  @IsNumber()
  transaction_amount: number;

  /**
   * ID único del usuario en nuestra base de datos
   * Se usa para relacionar la suscripción con el usuario correcto
   * Debe existir en la tabla de usuarios
   */
  @ApiProperty({ 
    example: 'e9ba9d84-a7dc-4b6e-8ee4-46685d8391f0',
    description: "ID único del usuario que crea la suscripción"
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  /**
   * Tipo de plan de suscripción
   * Define el tipo de suscripción que está comprando el usuario
   * - welcome: Suscripción de bienvenida (1 mes gratis)
   * - monthly: Suscripción mensual (1 mes)
   * - quarterly: Suscripción trimestral (3 meses)
   * - lifetime: Suscripción de por vida
   */
  @ApiProperty({ 
    example: "monthly",
    description: "Tipo de plan: 'welcome', 'monthly', 'quarterly', 'lifetime'",
    enum: ['welcome', 'monthly', 'quarterly', 'lifetime']
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['welcome', 'monthly', 'quarterly', 'lifetime'])
  planType: 'welcome' | 'monthly' | 'quarterly' | 'lifetime';
}
