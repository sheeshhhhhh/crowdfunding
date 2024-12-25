import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CampaignService } from 'src/campaign/campaign.service';
import { RequestUser } from 'src/guards/user.decorator';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DonationDto } from './dto/donation.dto';

@Injectable()
export class DonationService {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly campaignService: CampaignService,
        private readonly prisma: PrismaService
    ) {}

    // also include billing information
    async createDonationGateway(userId: string, { amount, paymentMethod, campaignId }: DonationDto) {
        const campaign = await this.campaignService.getCampaign(campaignId);

        const newPaymentIntent = await this.paymentService.createPaymentIntent(amount, userId, campaign);
        console.log(newPaymentIntent)
        const newPaymentMethod = await this.paymentService.createPaymentMethod(paymentMethod);  
        // meta data in attach payment
        const attachPayment = await this.paymentService.attachPaymentIntent(newPaymentIntent.id, newPaymentMethod.id, newPaymentIntent.attributes?.client_key)
        
        return {
            success: true,
            redirectUrl: attachPayment.attributes.next_action.redirect.url
        };
    }

    async checkDonations(userId: string | undefined, paymentId: string) {        
        const getPayment = await this.paymentService.retrievePaymentIntent(paymentId);

        if(getPayment.attributes.status !== 'succeeded') {
            return {
                success: false,
                message: 'Payment intent not yet succeeded'
            }
        }

        const redirectUrl = `${process.env.CLIENT_BASE_URL}/campaigns/${getPayment.attributes.metadata.campaignId}`// put to campaign page
        
        // check if donation exist already
        const checkDonation = await this.prisma.donation.findFirst({
            where: {
                paymentId: paymentId
            }
        })

        if(checkDonation) {
            return {
                success: false,
                message: 'Donation already exist'
            }
        }
        // if it is payed
        const donationData = await this.prisma.donation.create({
            data: {
                amount: getPayment.attributes.amount / 100,
                paymentId: paymentId,
                message: '', // put later on
                postId: getPayment.attributes.metadata.campaignId,
                userId: userId || undefined,
            }
        })

        const updateCampaign = await this.prisma.campaignPost.update({
            where: {
                id: getPayment.attributes.metadata.campaignId
            },
            data: {
                current: {
                    increment: getPayment.attributes.amount / 100
                },
                totalDonors: {
                    increment: 1
                }
            }
        })

        return {
            success: true,
            donation: donationData,
            redirect_url: redirectUrl
        }
    }

    async checkMyDonations(user: RequestUser, search: string, page: number) {
        try {
            const take = 10;
            const skip = (page - 1) * take;
            const donations = await this.prisma.donation.findMany({
                where: {
                    AND: [
                        {
                            post: {
                                userId: user.id, // Ensures the post belongs to the user
                            },
                        },
                        {
                            OR: [
                                {
                                    post: {
                                        title: {
                                            contains: search,
                                            mode: 'insensitive',
                                        },
                                    },
                                },
                                {
                                    user: {
                                        username: {
                                            contains: search,
                                            mode: 'insensitive',
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            profile: true,
                        },
                    },
                    post: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
                skip,
                take,
            });

            const hasNext = await this.prisma.donation.count({ where: { post: { userId: user.id } } }) > page * take;

            return {
                donations: donations,
                hasNext: hasNext,
            };
        } catch (error) {
            throw new InternalServerErrorException('Internal server error');
        }
    }

    async getDonationStatistics(user: RequestUser) {
        const totalDonations = await this.prisma.donation.aggregate({
            where: {
                userId: user.id,
            },
            _sum: {
                amount: true
            }
        })

        const averageDonation = await this.prisma.donation.aggregate({
            where: {
                userId: user.id
            },
            _avg: {
                amount: true
            }
        })

        const totalDonors = await this.prisma.donation.count({
            where: {
                userId: user.id
            }
        })

        return {
            totalDonations: totalDonations._sum.amount,
            totalDonors: totalDonors,
            averageDonation: averageDonation._avg.amount
        }
    }
}
