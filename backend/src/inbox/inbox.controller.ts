import { Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { RequestUser, User } from 'src/guards/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('inbox')
export class InboxController {
    constructor(
        private readonly inboxService: InboxService,
    ) {}

    @Patch('mark-as-read/:id')
    async markAsRead(@Param('id') id: string) {
        return this.inboxService.markAsRead(id);
    }

    @Get('notifications')
    async getNotifications(@User() user: RequestUser, @Query() query: { page: string }) {
        return this.inboxService.getNotifications(user, query);
    }

    @Get(':id')
    async getNotificationById(@Param('id') id: string) {
        return this.inboxService.getNotificationById(id);
    }

    @Delete(':id')
    async deleteNotification(@Param('id') id: string) {
        return this.inboxService.deleteNotification(id);
    }
}
