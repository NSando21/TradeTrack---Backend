import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';

/**
 * Entidad que representa una suscripción de usuario en el sistema
 * Esta tabla almacena las suscripciones creadas tanto en Mercado Pago como en nuestra base de datos local
 */
@Entity('subscriptions')
export class Subscription {
  /**
   * ID único auto-generado de la suscripción en nuestra base de datos
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Relación con el usuario que posee esta suscripción
   * eager: true significa que siempre se cargará el usuario junto con la suscripción
   */
  @ManyToOne(() => User, { eager: true })
  user: User;

  /**
   * ID único de la suscripción en Mercado Pago
   * Este ID se obtiene cuando creamos la suscripción en Mercado Pago
   * Es único para evitar duplicados
   * nullable: true porque las suscripciones de bienvenida no pasan por Mercado Pago
   */
  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  mercadoPagoSubscriptionId: string;

  /**
   * ID del pago asociado a esta suscripción en Mercado Pago
   * Se guarda cuando recibimos el webhook 'payment.created'
   * Se usa para consultar el estado real del pago via API de Mercado Pago
   * nullable: true porque inicialmente no tenemos este ID
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  mercadoPagoPaymentId: string;

  /**
   * Tipo de plan de suscripción
   * Define el tipo de suscripción que tiene el usuario
   * - welcome: Suscripción de bienvenida (1 mes gratis)
   * - monthly: Suscripción mensual (1 mes)
   * - quarterly: Suscripción trimestral (3 meses)
   * - lifetime: Suscripción de por vida
   */
  @Column({ type: 'varchar', length: 50 })
  planType: 'welcome' | 'monthly' | 'quarterly' | 'lifetime';

  /**
   * Estado actual de la suscripción
   * Valores posibles: 'pending', 'active', 'cancelled', 'paused'
   * - pending: Suscripción creada pero pago aún no procesado
   * - active: Suscripción activa y pago aprobado
   * - cancelled: Suscripción cancelada
   */
  @Column({ type: 'varchar', length: 50 })
  status: string;

  /**
   * Fecha de inicio de la suscripción
   * Se calcula automáticamente cuando se crea la suscripción
   * nullable: true para casos donde no se ha establecido aún
   */
  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  /**
   * Fecha de finalización de la suscripción
   * Se calcula basándose en frequency y frequency_type
   * Ejemplo: frequency=1, frequency_type='months' = 1 mes desde startDate
   */
  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  /**
   * Fecha de creación del registro en nuestra base de datos
   * Se establece automáticamente por TypeORM
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Fecha de última actualización del registro
   * Se actualiza automáticamente cada vez que se modifica la suscripción
   */
  @UpdateDateColumn()
  updatedAt: Date;
} 