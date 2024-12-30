import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { InboxGateway } from './inbox.gateway';

@Module({
  providers: [InboxService, InboxGateway],
  controllers: [InboxController],
  exports: [InboxService, InboxGateway],
})
export class InboxModule {}
