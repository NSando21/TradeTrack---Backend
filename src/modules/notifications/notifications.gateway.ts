import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.connectedUsers.entries()].find(([_, socketId]) => socketId === client.id)?.[0];
    if (userId) {
      this.connectedUsers.delete(userId);
    }
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('register')
  onRegister(client: Socket, payload: { userId: string }) {
    this.connectedUsers.set(payload.userId, client.id);
    console.log(`Usuario ${payload.userId} registrado con socket ${client.id}`);
  }

  notifyUser(userId: string, mensaje: string) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notificacion', { mensaje });
    }
  }
}
