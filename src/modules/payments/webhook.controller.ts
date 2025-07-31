import { Controller, Post, Req, Logger, BadRequestException, Headers } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './Entities/subscription.entity';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import * as crypto from 'crypto';

/**
 * Configuración del cliente de Mercado Pago para consultas de pagos
 * Se usa para verificar el estado real de los pagos via API
 */
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

/**
 * Instancia del SDK de Payment para consultar detalles de pagos
 * Permite obtener el estado real de un pago usando su ID
 */
const payment = new Payment(client);

/**
 * Controlador que maneja los webhooks de Mercado Pago
 * Recibe notificaciones en tiempo real sobre eventos de suscripciones y pagos
 * Procesa estos eventos y actualiza el estado de las suscripciones en la base de datos
 */
@Controller('payments/webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  /**
   * Endpoint principal que recibe todos los webhooks de Mercado Pago
   * 
   * Este método es el punto de entrada para todas las notificaciones de Mercado Pago:
   * - subscription_preapproval: Suscripciones creadas/actualizadas
   * - payment: Pagos creados
   * - subscription_authorized_payment: Pagos autorizados para suscripciones
   * 
   * @param req - Request completo con el body del webhook
   * @param signature - Firma del webhook para validación (opcional)
   * @returns Confirmación de recepción
   */
  @Post()
  async handleWebhook(@Req() req, @Headers('x-signature') signature: string) {
    try {
      this.logger.log('Webhook recibido:', req.body);

      // Validar la autenticidad del webhook (opcional pero recomendado)
      if (signature) {
        this.validateWebhookSignature(req.body, signature);
      }

      const { type, action, data } = req.body;

      // Procesar eventos de suscripción
      if (type && action) {
        await this.processSubscriptionEvent(type, action, data);
      }

      return { received: true };
    } catch (error) {
      this.logger.error('Error procesando webhook:', error);
      throw new BadRequestException('Error procesando webhook');
    }
  }

  /**
   * Valida la firma del webhook para asegurar que viene de Mercado Pago
   * Por ahora solo loguea la firma, pero se puede implementar validación completa
   * 
   * @param body - Cuerpo del webhook
   * @param signature - Firma enviada por Mercado Pago
   */
  private validateWebhookSignature(body: any, signature: string) {
    // Implementar validación de firma si Mercado Pago la proporciona
    // Por ahora, solo logueamos la firma
    this.logger.log('Firma del webhook:', signature);
  }

  /**
   * Procesa los diferentes tipos de eventos de suscripción
   * 
   * Este método actúa como un router que dirige cada tipo de evento
   * a su método de procesamiento específico
   * 
   * @param type - Tipo de evento (subscription_preapproval, payment, subscription_authorized_payment)
   * @param action - Acción específica (created, updated, payment.created)
   * @param data - Datos del evento
   */
  private async processSubscriptionEvent(type: string, action: string, data: any) {
    this.logger.log(`Procesando evento: ${type} - ${action}`, data);

    // Procesar eventos de suscripción (creación y actualización)
    if (type === 'subscription_preapproval') {
      switch (action) {
        case 'created':
          await this.handleSubscriptionCreated(data);
          break;
        case 'updated':
          await this.handleSubscriptionUpdated(data);
          break;
        default:
          this.logger.warn(`Acción de suscripción no manejada: ${action}`);
      }
    } 
    // Procesar eventos de pago (cuando se crea un pago)
    else if (type === 'payment') {
      switch (action) {
        case 'payment.created':
          await this.handlePaymentCreated(data);
          break;
        default:
          this.logger.warn(`Acción de pago no manejada: ${action}`);
      }
    } 
    // Procesar eventos de pago autorizado (cuando se autoriza un pago para una suscripción)
    else if (type === 'subscription_authorized_payment') {
      switch (action) {
        case 'created':
          await this.handleSubscriptionAuthorizedPayment(data);
          break;
        default:
          this.logger.warn(`Acción de pago autorizado no manejada: ${action}`);
      }
    }
  }

  /**
   * Maneja el evento de suscripción creada
   * 
   * Este evento se recibe cuando Mercado Pago confirma que la suscripción
   * fue creada exitosamente en su sistema
   * 
   * @param data - Datos del evento con el ID de la suscripción
   */
  private async handleSubscriptionCreated(data: any) {
    const subscriptionId = data.id;
    this.logger.log(`Suscripción creada: ${subscriptionId}`);
    // La suscripción ya se guarda en createSubscription, no necesitamos hacer nada aquí
  }

  /**
   * Maneja el evento de suscripción actualizada
   * 
   * Este evento se recibe cuando Mercado Pago actualiza el estado
   * de una suscripción existente
   * 
   * @param data - Datos del evento con el ID de la suscripción
   */
  private async handleSubscriptionUpdated(data: any) {
    const subscriptionId = data.id;
    this.logger.log(`Suscripción actualizada: ${subscriptionId}`);
    // Puedes actualizar otros campos si es necesario
  }

  /**
   * Maneja el evento de pago creado
   * 
   * Este evento es CRUCIAL para nuestro flujo:
   * 1. Se recibe cuando Mercado Pago crea un pago asociado a una suscripción
   * 2. Guardamos el ID del pago en nuestra base de datos
   * 3. Este ID se usará más tarde para verificar el estado real del pago
   * 
   * @param data - Datos del evento con el ID del pago
   */
  private async handlePaymentCreated(data: any) {
    const paymentId = data.id;
    this.logger.log(`Pago creado: ${paymentId}`);

    try {
      // Buscar la suscripción más reciente que esté en estado 'pending'
      const subscription = await this.subscriptionRepository.findOne({
        where: { status: 'pending' },
        order: { createdAt: 'DESC' }
      });

      if (subscription) {
        // Guardar el ID del pago en la suscripción
        // Este ID se usará más tarde para consultar el estado real del pago
        subscription.mercadoPagoPaymentId = paymentId;
        await this.subscriptionRepository.save(subscription);
        this.logger.log(`ID de pago ${paymentId} guardado en suscripción ${subscription.mercadoPagoSubscriptionId} para usuario ${subscription.user.id}`);
      } else {
        this.logger.warn(`No se encontró suscripción pendiente para guardar el pago ${paymentId}`);
      }
    } catch (error) {
      this.logger.error(`Error guardando pago ${paymentId}:`, error);
    }
  }

  /**
   * Maneja el evento de pago autorizado para suscripción
   * 
   * Este es el evento MÁS IMPORTANTE de nuestro flujo:
   * 1. Se recibe cuando Mercado Pago autoriza un pago para una suscripción
   * 2. IMPORTANTE: Este evento se envía tanto para pagos exitosos como rechazados
   * 3. Por eso NO confiamos solo en este evento, sino que consultamos la API
   * 4. Usamos el mercadoPagoPaymentId guardado para consultar el estado real
   * 5. Solo activamos la suscripción si el pago está 'approved'
   * 
   * @param data - Datos del evento con el ID del pago autorizado
   */
  private async handleSubscriptionAuthorizedPayment(data: any) {
    const authorizedPaymentId = data.id;
    this.logger.log(`Pago autorizado de suscripción: ${authorizedPaymentId}`);

    try {
      // Buscar la suscripción más reciente que esté en estado 'pending'
      const subscription = await this.subscriptionRepository.findOne({
        where: { status: 'pending' },
        order: { createdAt: 'DESC' }
      });

      if (subscription && subscription.mercadoPagoPaymentId) {
        this.logger.log(`Consultando estado del pago original: ${subscription.mercadoPagoPaymentId}`);
        
        try {
          // Consultar la API de Mercado Pago para obtener el estado real del pago
          const paymentDetails = await payment.get({ id: subscription.mercadoPagoPaymentId });
          this.logger.log(`Estado del pago original ${subscription.mercadoPagoPaymentId}: ${paymentDetails.status}`);
          
          // Solo activar la suscripción si el pago está aprobado
          if (paymentDetails.status === 'approved') {
            subscription.status = 'active';
            await this.subscriptionRepository.save(subscription);
            this.logger.log(`Suscripción ${subscription.mercadoPagoSubscriptionId} activada por pago autorizado ${authorizedPaymentId}`);
          } else {
            // No activar si el pago está rechazado, pendiente, etc.
            this.logger.warn(`Pago original ${subscription.mercadoPagoPaymentId} no está aprobado (estado: ${paymentDetails.status}), no se activa la suscripción`);
          }
        } catch (paymentError) {
          this.logger.error(`Error consultando pago original ${subscription.mercadoPagoPaymentId}:`, paymentError);
          // Si no podemos consultar el pago, no activamos la suscripción por seguridad
          this.logger.warn(`No se puede verificar el estado del pago, no se activa la suscripción`);
        }
      } else {
        this.logger.warn(`No se encontró suscripción pendiente o ID de pago para activar con pago autorizado ${authorizedPaymentId}`);
      }
    } catch (error) {
      this.logger.error(`Error procesando pago autorizado ${authorizedPaymentId}:`, error);
    }
  }

  /**
   * Método auxiliar para activar una suscripción por pago
   * 
   * Este método ya no se usa en el flujo actual, pero se mantiene
   * como referencia para futuras implementaciones
   * 
   * @param paymentId - ID del pago que activa la suscripción
   */
  private async activateSubscriptionByPayment(paymentId: string) {
    try {
      // Buscar la suscripción más reciente que esté en estado 'pending'
      // Esto es una aproximación, idealmente deberías tener una relación entre pago y suscripción
      const subscription = await this.subscriptionRepository.findOne({
        where: { status: 'pending' },
        order: { createdAt: 'DESC' }
      });

      if (subscription) {
        subscription.status = 'active';
        await this.subscriptionRepository.save(subscription);
        this.logger.log(`Suscripción ${subscription.mercadoPagoSubscriptionId} activada por pago ${paymentId}`);
      } else {
        this.logger.warn(`No se encontró suscripción pendiente para activar con pago ${paymentId}`);
      }
    } catch (error) {
      this.logger.error(`Error activando suscripción por pago ${paymentId}:`, error);
    }
  }
}
