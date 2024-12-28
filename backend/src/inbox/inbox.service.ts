import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/inbox.dto';
import { RequestUser } from 'src/guards/user.decorator';
import { InboxGateway } from './inbox.gateway';

@Injectable()
export class InboxService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly inboxGateway: InboxGateway
    ) {}

    async createNotification(data: CreateNotificationDto) {
        const createNotif = await this.prisma.notification.create({
            data: {
                userId: data.userId,
                title: data.title,
                message: data.message,
                type: data.type,
                isRead: data.isRead,
            }
        })
        
        if(createNotif.type === 'PUSH') {
            // send notification through socket
            const socketId = await this.inboxGateway.getSocketId(data.userId);
            if(!socketId) return;

            this.inboxGateway.io.to(socketId).emit('notification', createNotif);
        }

        return createNotif;
    }

    async markAsRead(id: string) {
        const notification = await this.prisma.notification.update({
            where: {
                id: id
            },
            data: {
                isRead: true
            }
        })

        return notification
    }


    async getNotifications(user: RequestUser, query: { page: string, isRead: string }) {
        const take = 10;
        const skip = (parseInt(query.page) - 1) * take;

        const notification = await this.prisma.notification.findMany({
            where: {
                userId: user.id,
                isRead: query.isRead === 'true' ? true : false
            },
            take: take,
            skip: skip,
        })

        return notification
    }

    // i don't think this will be used
    // maybe add a url redirections for urls?
    async getNotificationById(id: string) {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: id
            }
        })

        return notification
    }
}
