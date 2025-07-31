import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from '../payments/Entities/subscription.entity';

/**
 * Módulo de suscripciones
 * 
 * Este módulo maneja toda la lógica relacionada con suscripciones de usuarios:
 * - Consulta de suscripciones
 * - Validación de suscripciones activas
 * - Creación de suscripciones de bienvenida
 * - Cancelación de suscripciones
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]), // Importar la entidad Subscription
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
  ],
  exports: [
    SubscriptionsService,
  ],
})
export class SubscriptionsModule {} 