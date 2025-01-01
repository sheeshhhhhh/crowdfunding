import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestUser } from 'src/guards/user.decorator';
import { InboxGateway } from 'src/inbox/inbox.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly socket: InboxGateway,
    ) {}

    async createConversations(receiverId: string, user: RequestUser) {
        const getConversation = await this.prisma.conversation.findFirst({
            where: {
                AND: [
                    {
                        participants: {
                            some: { id: user.id },
                        },
                    },
                    {
                        participants: {
                            some: { id: receiverId },
                        },
                    },
                ]
            }
        })

        // if there is no conversation
        if(getConversation) {
            return getConversation;
        }
        const createConversation = await this.prisma.conversation.create({
            data: {
                participants: {
                    connect: [
                        { id: user.id },
                        { id: receiverId }
                    ]
                }
            }
        });

        return createConversation
    }

    async sendMessage(message: any, receiverId: string, user: RequestUser, conversationId?: string | undefined) {

        if(!conversationId) {
            const conversation = await this.createConversations(receiverId, user);
            conversationId = conversation.id;
        }

        const receiver = await this.prisma.user.findFirst({
            where: {
                id: receiverId
            }
        });

        if(!receiver) {
            throw new Error('Receiver not found');
        }

        const createMessage = await this.prisma.message.create({
            data: {
                conversationId: conversationId,
                message: message,
                receiverId: receiverId,
                senderId: user.id,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        profile: true,
                    }
                },
            }
        });

        // if the user is online, send the message to the user
        const receiverSocketId = await this.socket.getSocketId(createMessage.receiverId);
        if(receiverSocketId) {
            this.socket.io.to(receiverSocketId).emit('message', createMessage);
        }

        return createMessage;
    }

    async getMessages(otherUserId: string, user: RequestUser, page: string) {
        const take = 20;
        const skip = (parseInt(page) - 1 | 0)  * take;

        const allMessages = await this.prisma.conversation.findFirst({
            where: {
                AND: [
                    {
                        participants: {
                            some: { id: user.id },
                        },
                    },
                    {
                        participants: {
                            some: { id: otherUserId },
                        },
                    },
                ]
            },
            include: {
                messages: {
                    orderBy: {
                        createAt: 'desc'
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                username: true,
                                profile: true,
                            }
                        }
                    },
                    take: take,
                    skip: skip
                },
                participants: {
                    where: {
                        id: {
                            not: user.id
                        }
                    },
                    select: {
                        id: true,
                        username: true,
                        profile: true
                    }
                }
            }
        })

        if(!allMessages) {
            throw new NotFoundException('Conversation not found');
        }

        if(allMessages) {
            allMessages.messages = allMessages.messages.reverse();
        }

        return allMessages
    }

    async GetPastConversation(user: RequestUser, search: string, page: string) {
        const take = 9;
        const skip = (parseInt(page) - 1 | 0)  * take;
        
        const pastConversations = await this.prisma.conversation.findMany({
            where: {
                AND: [
                    {
                        participants: {
                            some: {
                                id: user.id,
                            },
                        }
                    },
                    {
                        participants: {
                            some: {
                                id: {
                                    not: user.id
                                },
                                username: {
                                    contains: search,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                messages: {
                    orderBy: {
                        createAt: 'desc'
                    },
                    take: 1
                },
                participants: {
                    where: {
                        id: {
                            not: user.id
                        }
                    },
                    select: {
                        id: true,
                        username: true,
                        profile: true
                    }
                }
            },
            take: take,
            skip: skip
        })

        return pastConversations;
    }

    

    async DeleteMessage(messageId: string, user: RequestUser) {
        // get message
        const message = await this.prisma.message.findFirst({
            where: {
                id: messageId
            }
        });

        if(!message) {
            throw new Error('Message not found');
        }

        // check if the user is the sender of the message
        if(message.senderId !== user.id) {
            throw new Error('You are not the sender of this message');
        }

        const deleteMessage = await this.prisma.message.update({
            where: {
                id: messageId
            },
            data: {
                status: 'DELETED',
                message: 'Deleted'
            }
        });

        return deleteMessage;
    }
}
