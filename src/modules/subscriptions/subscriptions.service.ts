import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../payments/Entities/subscription.entity';
import { SubscriptionResponseDto } from './dtos/subscription-response.dto';

/**
 * Servicio que maneja la lógica de negocio para suscripciones
 * Responsable de consultar, validar y gestionar el estado de las suscripciones de usuarios
 */
@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  /**
   * Obtiene la suscripción actual de un usuario
   * 
   * Este método busca la suscripción más reciente del usuario y calcula su estado actual:
   * - Si no tiene suscripción: retorna null
   * - Si tiene suscripción activa: retorna datos completos con isActive = true
   * - Si tiene suscripción expirada: retorna datos con isActive = false y status = 'expired'
   * 
   * @param userId - ID del usuario para buscar su suscripción
   * @returns Objeto con la suscripción o null si no existe
   * @throws NotFoundException si el usuario no existe
   */
  async getUserSubscription(userId: string): Promise<{ subscription: SubscriptionResponseDto | null }> {
    try {
      // Buscar la suscripción más reciente del usuario
      const subscription = await this.subscriptionRepository.findOne({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' }
      });

      // Si no tiene suscripción, retornar null
      if (!subscription) {
        this.logger.log(`Usuario ${userId} no tiene suscripciones`);
        return { subscription: null };
      }

      // Calcular el estado actual de la suscripción
      const currentDate = new Date();
      const isExpired = subscription.endDate && currentDate > subscription.endDate;
      const isActive = subscription.status === 'active' && !isExpired;

      // Determinar el status final
      let finalStatus: 'active' | 'expired' | 'cancelled';
      if (subscription.status === 'cancelled') {
        finalStatus = 'cancelled';
      } else if (isExpired) {
        finalStatus = 'expired';
      } else {
        finalStatus = 'active';
      }

      // Construir la respuesta
      const subscriptionResponse: SubscriptionResponseDto = {
        id: subscription.id.toString(),
        userId: subscription.user.id,
        planType: subscription.planType,
        status: finalStatus,
        startDate: subscription.startDate.toISOString(),
        endDate: subscription.endDate ? subscription.endDate.toISOString() : null,
        isActive: isActive,
        mpSubscriptionId: subscription.mercadoPagoSubscriptionId,
        created_at: subscription.createdAt.toISOString(),
        updated_at: subscription.updatedAt.toISOString(),
      };

      this.logger.log(`Suscripción encontrada para usuario ${userId}: ${finalStatus}`);
      return { subscription: subscriptionResponse };

    } catch (error) {
      this.logger.error(`Error obteniendo suscripción para usuario ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Verifica si un usuario tiene una suscripción activa
   * 
   * @param userId - ID del usuario a verificar
   * @returns true si tiene suscripción activa, false en caso contrario
   */
  async hasActiveSubscription(userId: string): Promise<boolean> {
    try {
      const result = await this.getUserSubscription(userId);
      return result.subscription?.isActive || false;
    } catch (error) {
      this.logger.error(`Error verificando suscripción activa para usuario ${userId}:`, error);
      return false;
    }
  }

  /**
   * Crea una suscripción de bienvenida para un usuario nuevo
   * 
   * Este método se llama automáticamente cuando un usuario se registra
   * Crea una suscripción gratuita de 1 mes sin pasar por Mercado Pago
   * 
   * @param userId - ID del usuario que se acaba de registrar
   * @param userEmail - Email del usuario
   * @returns La suscripción de bienvenida creada
   */
  async createWelcomeSubscription(userId: string, userEmail: string): Promise<Subscription> {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // 1 mes de duración

      const welcomeSubscription = await this.subscriptionRepository.save({
        user: { id: userId },
        planType: 'welcome',
        status: 'active',
        startDate: startDate,
        endDate: endDate,
        mercadoPagoSubscriptionId: null, // No pasa por Mercado Pago
        mercadoPagoPaymentId: null,
      });

      this.logger.log(`Suscripción de bienvenida creada para usuario ${userId}`);
      return welcomeSubscription;

    } catch (error) {
      this.logger.error(`Error creando suscripción de bienvenida para usuario ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Cancela la suscripción actual de un usuario
   * 
   * @param userId - ID del usuario cuya suscripción se va a cancelar
   * @returns La suscripción cancelada
   */
  async cancelSubscription(userId: string): Promise<Subscription> {
    try {
      const subscription = await this.subscriptionRepository.findOne({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' }
      });

      if (!subscription) {
        throw new NotFoundException(`No se encontró suscripción para el usuario ${userId}`);
      }

      subscription.status = 'cancelled';
      const cancelledSubscription = await this.subscriptionRepository.save(subscription);

      this.logger.log(`Suscripción cancelada para usuario ${userId}`);
      return cancelledSubscription;

    } catch (error) {
      this.logger.error(`Error cancelando suscripción para usuario ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Simula la expiración de una suscripción (SOLO PARA PRUEBAS)
   * 
   * Este método modifica la fecha de fin de la suscripción para simular
   * que ya expiró, permitiendo probar la lógica de expiración
   * 
   * @param userId - ID del usuario cuya suscripción se va a simular como expirada
   * @returns La suscripción con fecha de expiración modificada
   */
  async simulateExpiration(userId: string): Promise<Subscription> {
    try {
      const subscription = await this.subscriptionRepository.findOne({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' }
      });

      if (!subscription) {
        throw new NotFoundException(`No se encontró suscripción para el usuario ${userId}`);
      }

      // Simular que la suscripción expiró hace 1 día
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() - 1); // 1 día en el pasado
      
      subscription.endDate = expiredDate;
      subscription.status = 'expired'; // También cambiar el status en la BD
      const expiredSubscription = await this.subscriptionRepository.save(subscription);

      this.logger.log(`Suscripción simulada como expirada para usuario ${userId}`);
      return expiredSubscription;

    } catch (error) {
      this.logger.error(`Error simulando expiración para usuario ${userId}:`, error);
      throw error;
    }
  }
} 