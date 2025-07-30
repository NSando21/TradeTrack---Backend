// src/modules/notifications/notifications.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();
  private userNotifications = new Map<string, any[]>(); // Almacenar notificaciones por usuario

  handleConnection(client: Socket) {
    console.log(`🟢 Cliente conectado: ${client.id} desde ${client.handshake.address}`);
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.connectedUsers.entries()].find(([_, socketId]) => socketId === client.id)?.[0];
    if (userId) {
      this.connectedUsers.delete(userId);
      console.log(`🔴 Usuario ${userId} desconectado`);
    }
    console.log(`🔴 Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('register')
  onRegister(client: Socket, payload: { userId: string }) {
    this.connectedUsers.set(payload.userId, client.id);
    console.log(`👤 Usuario ${payload.userId} registrado con socket ${client.id}`);
    
    // Confirmar registro al cliente
    client.emit('registered', { 
      userId: payload.userId, 
      socketId: client.id,
      timestamp: Date.now()
    });

    // Enviar notificaciones pendientes si las hay
    const pendingNotifications = this.userNotifications.get(payload.userId) || [];
    if (pendingNotifications.length > 0) {
      console.log(`📬 Enviando ${pendingNotifications.length} notificaciones pendientes a ${payload.userId}`);
      client.emit('pendingNotifications', { notifications: pendingNotifications });
      // Limpiar notificaciones enviadas
      this.userNotifications.delete(payload.userId);
    }
  }

  @SubscribeMessage('requestNotifications')
  onRequestNotifications(client: Socket, payload: { userId: string }) {
    console.log(`📬 Usuario ${payload.userId} solicita notificaciones pendientes`);
    const pendingNotifications = this.userNotifications.get(payload.userId) || [];
    client.emit('pendingNotifications', { notifications: pendingNotifications });
    
    // Limpiar después de enviar
    if (pendingNotifications.length > 0) {
      this.userNotifications.delete(payload.userId);
    }
  }

  @SubscribeMessage('markNotificationAsRead')
  onMarkAsRead(client: Socket, payload: { userId: string, notificationId: string }) {
    console.log(`✅ Notificación ${payload.notificationId} marcada como leída por ${payload.userId}`);
    // Aquí podrías implementar lógica para marcar como leída en base de datos
  }

  notifyUser(userId: string, mensaje: string, tipo: string = 'info') {
  const socketId = this.connectedUsers.get(userId);
  console.log(`🔔 Intentando notificar a usuario ${userId} con socketId: ${socketId}`);
  const notification = {
    mensaje,
    tipo,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    userId
  };

  if (socketId) {
    console.log(`✅ Enviando notificación a socketId ${socketId}`);
    this.server.to(socketId).emit('notificacion', notification);
  } else {
    console.warn(`⚠️ Usuario ${userId} no está conectado. Guardando notificación pendiente.`);
    const userNotifs = this.userNotifications.get(userId) || [];
    userNotifs.push(notification);
    this.userNotifications.set(userId, userNotifs);
  }
}



  // Método para notificar viajes próximos
  notifyUpcomingTrip(userId: string, tripName: string, daysLeft: number) {
    const mensaje = daysLeft === 0 
      ? `🎯 ¡Hoy es tu viaje "${tripName}"!`
      : `⏰ Tu viaje "${tripName}" es en ${daysLeft} día${daysLeft > 1 ? 's' : ''}`;
    
    this.notifyUser(userId, mensaje, 'warning');
  }

  // Método para notificaciones de productos
  notifyProductCreated(userId: string, productName: string, tripName: string) {
    this.notifyUser(userId, `📦 Nuevo producto: ${productName} en ${tripName}`, 'success');
  }

  // Método para notificaciones de proveedores
  notifyProviderCreated(userId: string, providerName: string, tripName: string) {
    this.notifyUser(userId, `🏢 Nuevo proveedor: ${providerName} en ${tripName}`, 'success');
  }

  // Método para notificar a todos los usuarios conectados
  notifyAll(mensaje: string, tipo: string = 'info') {
    console.log(`📢 Notificando a todos los usuarios conectados: "${mensaje}"`);
    const notification = {
      mensaje,
      tipo,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      global: true
    };
    
    this.server.emit('notificacion', notification);
  }

  // Método para obtener estadísticas
  getConnectionStats() {
    return {
      connectedUsers: this.connectedUsers.size,
      pendingNotifications: Array.from(this.userNotifications.values()).reduce((acc, notifs) => acc + notifs.length, 0),
      usersList: Array.from(this.connectedUsers.keys())
    };
  }
}