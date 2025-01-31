import { Injectable } from '@nestjs/common';
import { type Socket } from 'socket.io';

@Injectable()
export class BoardService {
  public handleConnection(client: Socket): void {
    console.log(`client with id:${client.id} connected`);
  }

  public handleDisConnection(client: Socket): void {
    console.log(`client with id:${client.id} disconnected`);
  }

  public async handleBoardUpdate(newState: any): Promise<any> {
    console.log(newState);

    return Promise.resolve(newState);
  }
}
