import { Injectable } from '@nestjs/common';
import { CampaignService } from 'src/campaign/campaign.service';
import { PaymentService } from 'src/payment/payment.service';
import { DonationDto } from './dto/donation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestUser } from 'src/guards/user.decorator';

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
        const newPaymentMethod = await this.paymentService.createPaymentMethod(paymentMethod);  
        // meta data in attach payment
        const attachPayment = await this.paymentService.attachPaymentIntent(newPaymentIntent.id, newPaymentMethod.id, newPaymentIntent.attributes?.client_key)
        
        return {
            success: true,
            redirectUrl: attachPayment.attributes.next_action.redirect.url
        };
    }

    async checkDonations(userId: string, paymentId: string) {        
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
                userId: userId,
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


            const donations = await this.prisma.donation.findMany({
                where: {
                    userId: user.id,
                    
                }
            })

            return donations;
        } catch (error) {
            
        }
    }
}
