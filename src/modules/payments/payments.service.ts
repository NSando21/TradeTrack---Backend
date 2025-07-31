import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './Entities/subscription.entity';

/**
 * Configuración del cliente de Mercado Pago
 * Se inicializa con el token de acceso desde las variables de entorno
 */
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

/**
 * Instancia del SDK de PreApproval para manejar suscripciones
 * Permite crear suscripciones personalizadas sin plan asociado
 */
const preapproval = new PreApproval(client);

/**
 * Servicio que maneja la lógica de negocio para pagos y suscripciones
 * Responsable de crear suscripciones en Mercado Pago y sincronizarlas con la base de datos local
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  /**
   * Crea o actualiza la suscripción de un usuario
   * 
   * Este método implementa el flujo completo de gestión de suscripciones:
   * 1. Verifica si el usuario ya tiene una suscripción
   * 2. Si existe, la actualiza; si no, crea una nueva
   * 3. Crea la suscripción en Mercado Pago usando el SDK
   * 4. Calcula las fechas de inicio y fin basándose en la frecuencia
   * 5. Sincroniza con la base de datos local
   * 6. Retorna tanto los datos de Mercado Pago como los locales
   * 
   * @param dto - Datos de la suscripción a crear/actualizar
   * @returns Objeto con datos de Mercado Pago y base de datos local
   * @throws BadRequestException si hay error en la creación
   */
  async createSubscription(dto: CreateSubscriptionDto) {
    try {
      // Verificar si el usuario ya tiene una suscripción
      const existingSubscription = await this.subscriptionRepository.findOne({
        where: { user: { id: dto.user_id } },
        order: { createdAt: 'DESC' }
      });

      // Crear la suscripción en Mercado Pago usando el SDK
      const subscription = await preapproval.create({
        body: {
          reason: 'Suscripción TradeTrack', // Descripción de la suscripción
          payer_email: dto.payer_email, // Email del pagador
          auto_recurring: {
            frequency: dto.frequency, // Número de unidades (ej: 1)
            frequency_type: dto.frequency_type, // Tipo de frecuencia (ej: 'months')
            transaction_amount: dto.transaction_amount, // Monto en centavos
            currency_id: 'COP', // Moneda (Pesos Colombianos)
          },
          back_url: process.env.MERCADOPAGO_BACK_URL, // URL de retorno después del pago
          status: 'pending' // Estado inicial de la suscripción
        }
      });

      // Calcular fecha de término basada en frequency y frequency_type
      const startDate = new Date(); // Fecha de inicio (hoy)
      const endDate = new Date(); // Fecha de fin (a calcular)
      
      // Calcular la fecha de fin según el tipo de frecuencia
      if (dto.frequency_type === 'months') {
        endDate.setMonth(endDate.getMonth() + dto.frequency);
      } else if (dto.frequency_type === 'days') {
        endDate.setDate(endDate.getDate() + dto.frequency);
      } else if (dto.frequency_type === 'years') {
        endDate.setFullYear(endDate.getFullYear() + dto.frequency);
      }

      let savedSubscription;

      if (existingSubscription) {
        // Actualizar suscripción existente
        this.logger.log(`Actualizando suscripción existente para usuario ${dto.user_id}`);
        
        existingSubscription.mercadoPagoSubscriptionId = subscription.id;
        existingSubscription.planType = dto.planType;
        existingSubscription.status = subscription.status;
        existingSubscription.startDate = startDate;
        existingSubscription.endDate = endDate;
        existingSubscription.mercadoPagoPaymentId = null; // Resetear payment ID
        
        savedSubscription = await this.subscriptionRepository.save(existingSubscription);
      } else {
        // Crear nueva suscripción
        this.logger.log(`Creando nueva suscripción para usuario ${dto.user_id}`);
        
        savedSubscription = await this.subscriptionRepository.save({
          user: { id: dto.user_id }, // Relacionar con el usuario
          mercadoPagoSubscriptionId: subscription.id, // ID de Mercado Pago
          planType: dto.planType, // Tipo de plan (welcome, monthly, quarterly, lifetime)
          status: subscription.status, // Estado inicial (pending)
          startDate: startDate, // Fecha de inicio calculada
          endDate: endDate, // Fecha de fin calculada
        });
      }

      // Retornar tanto los datos de Mercado Pago como los locales
      return { 
        mpSubscription: subscription, // Datos de Mercado Pago
        dbSubscription: savedSubscription // Datos de nuestra base de datos
      };
    } catch (error) {
      this.logger.error('Error creando/actualizando suscripción:', error);
      throw new BadRequestException(error.message || 'Error en la suscripción');
    }
  }
}
