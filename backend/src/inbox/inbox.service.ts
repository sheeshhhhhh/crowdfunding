import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/inbox.dto';
import { RequestUser } from 'src/guards/user.decorator';
import { InboxGateway } from './inbox.gateway';
import { Prisma } from '@prisma/client';

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
        try {
            const notification = await this.prisma.notification.update({
                where: {
                    id: id
                },
                data: {
                    isRead: true
                }
            })
    
            return notification
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
                if(error.code === 'P2025') {
                    throw new NotFoundException('Notification not found')
                }
            }
            throw new InternalServerErrorException('An error occurred')
        }
    }


    async getNotifications(user: RequestUser, query: { page: string }) {
        const take = 15;
        const skip = (parseInt(query.page) - 1) * take;

        const notification = await this.prisma.notification.findMany({
            where: {
                userId: user.id,
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

    async deleteNotification(id: string) {
        try {
            const notification = await this.prisma.notification.delete({
                where: {
                    id: id
                }
            })
    
            return notification
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
                if(error.code === 'P2025') {
                    throw new NotFoundException('Notification not found')
                }
            }
            throw new InternalServerErrorException('An error occurred')
        }
    }
}
