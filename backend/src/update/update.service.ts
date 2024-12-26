import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RequestUser } from 'src/guards/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUpdateDto } from './dto/update.dto';

@Injectable()
export class UpdateService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async postUpdate(body: CreateUpdateDto, user: RequestUser) {
        // making sure that the user is the owner of the campaign where the update is being posted  
        const getCampaign = await this.prisma.campaignPost.findFirst({ 
            where: { 
                userId: user.id,
                id: body.campaignId
            } 
        })
        
        if(!getCampaign) {
            throw new NotFoundException('Campaign not found')
        }

        if(getCampaign.userId !== user.id) {
            throw new ForbiddenException('You are not authorized to post an update')
        }

        const createUpdate = await this.prisma.update.create({
            data: {
                message: body.message,
                postId: body.campaignId
            }
        })

        return createUpdate
    }

    async getUpdates(campaignId: string) {
        const getUpdates = await this.prisma.update.findMany({
            where: {
                postId: campaignId
            }
        })

        return getUpdates
    }

    async getUpdate(campaignId: string) {
        const getUpdate = await this.prisma.update.findFirst({
            where: {
                postId: campaignId
            }
        })

        return getUpdate
    }

    // updating the update from campaign  
    async updateUpdate(body: CreateUpdateDto, user: RequestUser, updateId: string) {
        // making sure that the user is the owner of the campaign where the update is being deleted
        const getCampaign = await this.prisma.campaignPost.findFirst({ 
            where: { 
                userId: user.id, 
                updates: {
                    some: {
                        id: updateId
                    }
                }
            } 
        })

        if(!getCampaign) {
            throw new NotFoundException('Campaign not found')
        }

        const updateUpdate = await this.prisma.update.update({
            where: {
                id: updateId
            },
            data: {
                message: body.message
            }
        })

        return updateUpdate
    }

    async deleteUpdate(user: RequestUser, updateId: string) {
        // making sure that the user is the owner of the campaign where the update is being deleted
        const getCampaign = await this.prisma.campaignPost.findFirst({
            where: {
                userId: user.id,
                updates: {
                    some: {
                        id: updateId
                    }
                }
            }
        })

        if(!getCampaign) {
            throw new NotFoundException('Campaign not found')
        }

        const deleteUpdate = await this.prisma.update.delete({
            where: {
                id: updateId
            }
        })

        return deleteUpdate
    }
}
