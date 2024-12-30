import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { InboxModule } from 'src/inbox/inbox.module';
import { MessageController } from './message.controller';

@Module({
  providers: [MessageService],
  imports: [InboxModule],
  controllers: [MessageController]
})
export class MessageModule {}
