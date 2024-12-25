import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RequestUser } from 'src/guards/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { DonationService } from 'src/donation/donation.service';

@Injectable()
export class CampaignService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly fileUpload: FileUploadService,
    ) {}

    async createCampaign(body: CreateCampaignDto, user: RequestUser, file: Express.Multer.File) {
        try {
            const userId = user?.id;

            const cloudUploadresult = await this.fileUpload.upload(file, { folder: 'headerImages' });

            const goal = parseInt(body.goal);

            const campaign = await this.prisma.campaignPost.create({
                data: {
                    headerImage: cloudUploadresult.secure_url,
                    userId: userId,
                    current: 0,
                    totalDonors: 0,
                    goal: goal,
                    title: body.title,
                    body: body.body,
                    endDate: body.endDate
                }
            })

            return campaign;
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('Campaign already exists in your account!');
                }
            }
            throw new InternalServerErrorException('internal server error');
        }
    }

    async getOverview(user: RequestUser) {
        const userId = user.id;

        const activeCampaigns = await this.prisma.campaignPost.findMany({
            where: {
                AND: [
                    {
                        userId: userId
                    },
                    {
                        endDate: {
                            gte: new Date()
                        },
                        status: 'ACTIVE'
                    }
                ]
            }
        });

        const totalDonations = await this.prisma.donation.aggregate({
            where: {
                userId: userId
            },
            _sum: {
                amount: true
            }
        });

        const averageDonation = await this.prisma.donation.aggregate({
            where: {
                userId: userId
            },
            _avg: {
                amount: true
            }
        });

        const totalDonors = await this.prisma.donation.aggregate({
            where: {
                userId: userId
            }, 
            _count: {
                id: true
            }
        });

        return {
            activeCampaigns,
            totalDonations,
            averageDonation,
            totalDonors,
        }
    }

    async getMyCampaigns(user: RequestUser) {
        const userId = user?.id;

        const campaigns = await this.prisma.campaignPost.findMany({
            where: {
                userId: userId
            }
        })

        return campaigns;
    }

    async BrowseCampaigns(searchQuery: { 
        search: string, page: number, filter: string 
    }) {
        // implement search and pagination later on
        const campaigns = await this.prisma.campaignPost.findMany({
            where: {
                title: {
                    contains: searchQuery.search,
                    mode: 'insensitive'
                }
            },
            include: {
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        });

        return campaigns;
    }

    async getCampaign(campaignId: string) {
        const campaigns = await this.prisma.campaignPost.findFirst({
            where: {
                id: campaignId
            },
            include: {
                user: {
                    select: {
                        profile: true,
                        username: true,
                        id: true
                    }
                }
            }
        });

        if(!campaigns) {
            throw new NotFoundException('Campaign not found');
        }

        return campaigns;
    }
    
    async updateCampaign(campaignId: string, body: UpdateCampaignDto, 
        file: Express.Multer.File, user: RequestUser) {
        // check if the campaign belongs to the user
        const userId = user?.id;
        const getCampaign = await this.prisma.campaignPost.findFirst({
            where: {
                id: campaignId
            }
        });

        if(getCampaign.userId !== userId) {
            throw new BadRequestException('You are not authorized to update this campaign');
        }

        // uploading a new image and deleting if there i an existing image
        let cloudUploadresult = undefined;
        if(file) {
            cloudUploadresult = await this.fileUpload.upload(file, { folder: 'headerImages' });
            if (getCampaign.headerImage) {
                await this.fileUpload.deleteFile(getCampaign.headerImage);
            }
        }
        
        // converting goal into a number
        const goal = body.goal ? parseInt(body.goal, 10) : undefined;
        if (goal && isNaN(goal)) {
            throw new BadRequestException('Goal must be a valid number');
        }

        const campaign = await this.prisma.campaignPost.update({
            where: {
                id: campaignId
            },
            data: {
                ...body,
                ...(cloudUploadresult && { headerImage: cloudUploadresult.secure_url }),
                ...(goal !== undefined && { goal: goal })
            }
        });

        return campaign;
    }

    async deleteCampaign(campaignId: string, user: RequestUser) {
        const userId = user?.id;

        // check if the campaign belongs to the user
        const getCampaign = await this.prisma.campaignPost.findFirst({
            where: {
                id: campaignId
            }
        });

        if(userId !== getCampaign.userId) {
            throw new BadRequestException('You are not authorized to delete this campaign');
        }

        const deleteCampaign = await this.prisma.campaignPost.delete({
            where: {
                id: campaignId
            }
        });

        return deleteCampaign;
    }

}
