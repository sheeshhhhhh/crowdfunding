import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';
import { MessageService } from './message.service';
import { RequestUser, User } from 'src/guards/user.decorator';
import { MessageDto } from './dto/message.dto';
import { query } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) {}

    @Post('sendMessage/:receiverId')
    async sendMessage(@Body() body: MessageDto, @Param('receiverId') receiverId: string, @User() user: RequestUser) {
        return this.messageService.sendMessage(body.message, receiverId, user, body.conversationId);
    }

    @Get('getMessages/:otherUserId')
    async getMessages(@Query('page') page: string, @Param('otherUserId') otherUserId: string, 
    @User() user: RequestUser) {
        return this.messageService.getMessages(otherUserId, user, page);
    }

    @Get('getPastConversation')
    async getPastConversation(@User() user: RequestUser, @Query() query: { search: string, page: string }) {
        return this.messageService.GetPastConversation(user, query.search, query.page);
    }

    @Delete('deleteMessage/:messageId')
    async deleteMessage(@Param('messageId') messageId: string, @User() user: RequestUser) {
        return this.messageService.DeleteMessage(messageId, user);
    }
}
