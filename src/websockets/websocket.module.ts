import { Module } from '@nestjs/common';
import { AppGateway } from './chat.gateway';

@Module({
  providers: [AppGateway],
})
export class WebsocketModule {}
