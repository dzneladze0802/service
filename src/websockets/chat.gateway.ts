import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true }) // Enable CORS for frontend connections
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendMessageToClient(clientId: string, message: string) {
    const client = this.server.sockets.sockets.get(clientId);
    if (client) {
      client.emit('custom-event', { message });
    }
  }

  // Broadcast to all connected clients
  broadcastToClients(event: string, data: any) {
    this.server.emit(event, data);
  }

  @SubscribeMessage('SEND_MESSAGE')
  handleClientMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message from client (${client.id}):`, message);

    // Optional: Respond back to the client
    client.emit('response-from-server', `Server received: ${message}`);
  }
}
