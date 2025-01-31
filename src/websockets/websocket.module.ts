import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { BoardService } from './board.service';

@Module({
  providers: [AppGateway, BoardService],
})
export class WebsocketModule {}
