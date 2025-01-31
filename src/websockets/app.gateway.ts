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
import { BoardService } from './board.service';

const enum EventEnum {
  UPDATE_BOARD = 'update-board',
  FAILED_UPDATE_BOARD = 'failed-update-board',
}

@WebSocketGateway({ cors: true }) // Enable CORS for frontend connections
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly boardService: BoardService) {}

  handleConnection(client: Socket): void {
    this.boardService.handleConnection(client);
  }

  handleDisconnect(client: Socket): void {
    this.boardService.handleDisConnection(client);
  }

  @SubscribeMessage(EventEnum.UPDATE_BOARD)
  async handleBoardUpdate(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    try {
      await this.boardService.handleBoardUpdate(message);

      client.emit(EventEnum.UPDATE_BOARD, {
        success: true,
        message: 'The board has been successfully updated.',
      });
    } catch (err) {
      client.emit(EventEnum.FAILED_UPDATE_BOARD, {
        success: false,
        message: 'Failed to update the board.',
      });
      console.error(err);
    }
  }
}
